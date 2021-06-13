package handlers

import (
	"02_covid_tracker/db"
	"02_covid_tracker/entities"
	"02_covid_tracker/models"
	"encoding/json"
	"log"
	"net/http"
	"sync"

	"github.com/gomodule/redigo/redis"
)

func CasesHandler(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)

	if !*ShouldRespond {
		w.Write([]byte(`{"message": "Our server is updating data. Please come back shortly :)"}`))
		return
	}
	
	rd := Pool.Get() 

	var filter string

	if r.FormValue("CityMunPSGC") != "" {
		filter = r.FormValue("CityMunPSGC")
	}
	if r.FormValue("RegionRes") != "" {
		filter = r.FormValue("RegionRes")
	}
	if r.FormValue("RegionRes") != "" && r.FormValue("CityMunPSGC") != ""{
		filter = "all"
	}

	c, err := redis.Bytes(rd.Do("HGET", "cases", filter))
	CovidCases := entities.CovidCases{}

	if err != nil{
		var wg sync.WaitGroup
		db, err := db.GetDB()
		if err != nil{
			log.Fatalf("DB Error: %v", err)
		}
		defer db.Close()

		CovidCasesModel := models.CovidCasesModel{
			DB: db,
		}

		wg.Add(1)
		go fetchCases(&wg, &CovidCasesModel, &CovidCases, r.FormValue("CityMunPSGC"), r.FormValue("RegionRes"))

		wg.Add(1)
		go fetchCasesChartData(&wg, &CovidCasesModel, &CovidCases, r.FormValue("CityMunPSGC"), r.FormValue("RegionRes"))

		wg.Add(1)
		go fetchRecoveriesChartData(&wg, &CovidCasesModel, &CovidCases, r.FormValue("CityMunPSGC"), r.FormValue("RegionRes"))

		wg.Add(1)
		go fetchDeathsChartData(&wg, &CovidCasesModel, &CovidCases, r.FormValue("CityMunPSGC"), r.FormValue("RegionRes"))

		wg.Wait()

		marshalledCovidCases, err := json.Marshal(&CovidCases)
		if err != nil{
			log.Fatalf("Error: %v", err)
		}

		rd.Do("HSET", "cases", filter, marshalledCovidCases)
		rd.Do("EXPIRE", "cases", 3200)

		json.NewEncoder(w).Encode(&CovidCases)
		return
	}

	json.Unmarshal(c, &CovidCases)

	json.NewEncoder(w).Encode(&CovidCases)
	return
}

func fetchCases(wg *sync.WaitGroup, c *models.CovidCasesModel, dataStruct *entities.CovidCases, CityMunPSGC string, RegionRes string) {
	defer wg.Done()
	var err error

	data, err := c.GetCovidCases(CityMunPSGC, RegionRes)
	if err != nil{
		log.Fatalf("Error fetching number of cases from db 1: %v", err)
	}
	dataStruct.CasesReport = data
}

func fetchCasesChartData(wg *sync.WaitGroup, c *models.CovidCasesModel, dataStruct *entities.CovidCases, CityMunPSGC string, RegionRes string) {
	defer wg.Done()

	data, err := c.GetCasesChartData(CityMunPSGC, RegionRes)
	if err != nil{
		log.Fatalf("Error fetching active cases: %v", err)
	}

	dataStruct.CasesChartData = data
}

func fetchRecoveriesChartData(wg *sync.WaitGroup, c *models.CovidCasesModel, dataStruct *entities.CovidCases, CityMunPSGC string, RegionRes string) {
	defer wg.Done()

	data, err := c.GetRecoveriesChartData(CityMunPSGC, RegionRes)
	
	if err != nil{
		log.Fatalf("Error fetching cumulative death cases from db 2: %v", err)
	}

	dataStruct.RecoveriesChartData = data
}


func fetchDeathsChartData(wg *sync.WaitGroup, c *models.CovidCasesModel, dataStruct *entities.CovidCases, CityMunPSGC string, RegionRes string) {
	defer wg.Done()

	data, err := c.GetDeathsChartData(CityMunPSGC, RegionRes)

	if err != nil{
		log.Fatalf("Error fetching cumulative death cases from db 2: %v", err)
	}

	dataStruct.DeathsChartData = data
}