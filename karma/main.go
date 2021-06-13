package main

import (
	"02_covid_tracker/db"
	"02_covid_tracker/handlers"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gomodule/redigo/redis"
	"github.com/gorilla/mux"
	"github.com/robfig/cron/v3"
)

var pool *redis.Pool
var err error
var res *sql.Rows
var ShouldRespond bool = false

type CoordsRow struct{
	Id  string
	Type  string
	IsSinglePoint  string
	Lat  string
	Lng  string
}

func main(){
	db.InitDB()
	db.UpdateData()
	ShouldRespond = true

	r := mux.NewRouter()
	r.HandleFunc("/cases", handlers.CasesHandler).Methods("GET")
	r.HandleFunc("/hospitals", handlers.HospitalsHandler).Methods("GET")
	r.HandleFunc("/coords", handlers.CoordsHandler).Methods("GET")

	rd, err := redis.Dial("tcp", "karma_redis_1:6379")
	if err != nil{
		log.Fatalf("Redis Error: %v", err)
	}
	defer rd.Close()

	pool = &redis.Pool{
		MaxIdle:     10,
		IdleTimeout: 240 * time.Second,
		Dial: func() (redis.Conn, error) {
			return redis.Dial("tcp", "karma_redis_1:6379")
		},
	}

	handlers.Pool = pool
	handlers.ShouldRespond = &ShouldRespond
	
	c := cron.New()

  c.AddFunc("@midnight", func() {
		ShouldRespond = false
		fmt.Println("should not respond")
		db.UpdateData()
		fmt.Println("should respond")
		ShouldRespond = true
  })

  c.Start()

	http.ListenAndServe(":8000", r)
}