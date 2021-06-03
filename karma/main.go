package main

import (
	"02_covid_tracker/handlers"
	"log"
	"net/http"
	"time"

	// "02_covid_tracker/models"
	// "02_covid_tracker/db"
	// "fmt"
	// "log"

	"github.com/rs/cors"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gomodule/redigo/redis"
	"github.com/gorilla/mux"
)

var pool *redis.Pool

func main(){

	r := mux.NewRouter()
	r.HandleFunc("/cases", handlers.CasesHandler).Methods("GET")
	r.HandleFunc("/hospitals", handlers.HospitalsHandler).Methods("GET")
	r.HandleFunc("/coords", handlers.CoordsHandler).Methods("GET")
	// drive.DownloadFile("1t_1wveQS0OUdg0kzGSOZhZAKrSctNUM9", "dataCollect.csv")
	
	rd, err := redis.Dial("tcp", "127.0.0.1:6379")
	if err != nil{
		log.Fatalf("Redis Error: %v", err)
	}
	defer rd.Close()

	pool = &redis.Pool{
		MaxIdle:     10,
		IdleTimeout: 240 * time.Second,
		Dial: func() (redis.Conn, error) {
			return redis.Dial("tcp", "localhost:6379")
		},
	}

	handlers.Pool = pool

	handler := cors.Default().Handler(r)

	http.ListenAndServe(":8000", handler)

	// results, err := db.Query("SELECT CaseCode FROM cases WHERE CityMunRes = 'ORMOC CITY';")
	// if err != nil{
	// 	log.Fatalf("Error opening connection to database: %v", err)
	// }

	// var Cases = []models.Case {}

	// for results.Next(){
	// 	Case := models.Case{}
	// 	err := results.Scan(&Case.CaseCode)
	// 	if err != nil{
	// 		log.Fatalf("Error scanning results: %v", err)
	// 	}
	// 	Cases = append(Cases, Case)
	// }

	// fmt.Println(Cases)

	// c := cron.New()

  // c.AddFunc("@daily", func() {
  //   fmt.Println("tick every day")
	// 	// https://www.googleapis.com/drive/v2/files/18ASz_c_XU2HSSIuTovjeglBTYHstvEsb
  // })

  // c.Start()

	
	// fmt.Print(db)

	// time.Sleep(time.Second * 5)
}