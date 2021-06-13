package handlers

import (
	"02_covid_tracker/db"
	"02_covid_tracker/entities"
	"02_covid_tracker/models"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gomodule/redigo/redis"
)


func CoordsHandler(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)

	if !*ShouldRespond {
		w.Write([]byte(`{"message": "Our server is updating data. Please come back shortly :)"}`))
		return
	}
	
	var c []byte
	var err error

	rd := Pool.Get()

	shouldRetry := false

	ActiveCasesCoords := []entities.ActiveCaseCoords{}

	for ok := true; ok; ok=shouldRetry{
		c, err = redis.Bytes(rd.Do("HGET", "coords", "data"))
		if err != nil{
			shouldRetry = true

			db, err := db.GetDB()
			if err != nil{
				log.Fatalf("Error: %v", err)
			}

			defer db.Close()
			ActiveCaseCoordsModel := models.ActiveCaseCoordsModel{
				DB: db,
			}

			res, err := ActiveCaseCoordsModel.GetAll()
			if err != nil{
				log.Fatalf("Error getting coords: %v", err)
			}
			
			marshalledRes, err := json.Marshal(res)
			if err != nil{
				log.Fatalf("Error: %v", err)
			}

			rd.Do("HMSET", "coords", "data", marshalledRes)
			rd.Do("EXPIRE", "coords", 1800)
		}else{
			shouldRetry = false
		}
	}

	json.Unmarshal(c, &ActiveCasesCoords)

	json.NewEncoder(w).Encode(&ActiveCasesCoords)
	return
}