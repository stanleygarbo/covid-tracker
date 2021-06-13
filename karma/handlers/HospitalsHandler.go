package handlers

import (
	"02_covid_tracker/db"
	"02_covid_tracker/entities"
	"02_covid_tracker/models"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gomodule/redigo/redis"
)

func HospitalsHandler(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)
	
	if !*ShouldRespond {
		w.Write([]byte(`{"message": "Our server is updating data. Please come back shortly :)"}`))
		return
	}
	
	rd := Pool.Get()
	defer rd.Close()
	
	var c []byte
	var err error

	db, err := db.GetDB()
	if err != nil{
		log.Fatalf("DB Error: %v", err)
	}
	defer db.Close()

	h := models.HospitalsModel{
		DB: db,
	}

	hfhudcode := r.FormValue("hfhudcode")
	
	shouldLoop := true
	for ok := true; ok; ok = shouldLoop { 
		c, err = redis.Bytes(rd.Do("HGET", "hospitals", "data"))
		if err != nil{
			fmt.Print(err)
			res, err := h.GetHospitals()
			if err != nil{
				log.Fatalf("Error: %v", err)
			}

			marshalledRes, err := json.Marshal(res)
			if err != nil{
				log.Fatalf("Error: %v", err)
			}

			rd.Do("HMSET", "hospitals", "data", marshalledRes)
			rd.Do("EXPIRE", "hospitals", 1800)
			shouldLoop = true
		}else {
			shouldLoop = false
		}
	}

	if hfhudcode == "" {
		hospitals := entities.Hospitals{}
		json.Unmarshal(c, &hospitals)

		if r.FormValue("CityMunPSGC") != "" && r.FormValue("RegionPSGC") != ""{
			filteredHospitals := entities.Hospitals{}

			for _, v := range hospitals{
					if (v.City_mun_psgc == "PH"+r.FormValue("CityMunPSGC") || v.City_mun_psgc == "PH0"+r.FormValue("CityMunPSGC")) && (v.Region_psgc == "PH"+r.FormValue("RegionPSGC") || v.Region_psgc == "PH0"+r.FormValue("RegionPSGC")){
						fmt.Println("appended")
						filteredHospitals = append(filteredHospitals, v)
					}
			}
			
			json.NewEncoder(w).Encode(&filteredHospitals)
			return
		} else if r.FormValue("CityMunPSGC") != "" || r.FormValue("RegionPSGC") != "" {
			filteredHospitals := entities.Hospitals{}

			for _, v := range hospitals{
					if (v.City_mun_psgc == "PH"+r.FormValue("CityMunPSGC") || v.City_mun_psgc == "PH0"+r.FormValue("CityMunPSGC")) || (v.Region_psgc == "PH"+r.FormValue("RegionPSGC") || v.Region_psgc == "PH0"+r.FormValue("RegionPSGC")){
						fmt.Println("appended")
						filteredHospitals = append(filteredHospitals, v)
					}
			}
			
			json.NewEncoder(w).Encode(&filteredHospitals)
			return
		}

		json.NewEncoder(w).Encode(&hospitals)
		return
	} else {
		hospital := []entities.Hospital{}

		json.Unmarshal(c, &hospital)

		for _, v := range hospital {
			if v.Hfhudcode == hfhudcode {
				json.NewEncoder(w).Encode(&v)
				return
			}
		}

		json.NewEncoder(w).Encode(&hospital)
		return
	}
}