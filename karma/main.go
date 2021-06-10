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
	"github.com/rs/cors"
)

var pool *redis.Pool
var err error
var res *sql.Rows
var ShouldRespond bool = false

func main(){
	db.InitDB()
	db.UpdateData()
	ShouldRespond = true

	r := mux.NewRouter()
	r.HandleFunc("/cases", handlers.CasesHandler).Methods("GET")
	r.HandleFunc("/hospitals", handlers.HospitalsHandler).Methods("GET")
	r.HandleFunc("/coords", handlers.CoordsHandler).Methods("GET")

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
	handlers.ShouldRespond = &ShouldRespond

	cors := cors.New(cors.Options{
    AllowedOrigins: []string{"http://ncovgo.vercel.app", "https://ncovgo.vercel.app", "https://ncovgo.com", "http://ncovgo.com"},
    AllowCredentials: true,
    AllowedMethods: []string{"GET"},
    // Enable Debugging for testing, consider disabling in production
    Debug: true,
	})

	handler := cors.Handler(r)
	
	c := cron.New()

  c.AddFunc("@midnight", func() {
		ShouldRespond = false
		fmt.Println("should not respond")
		db.UpdateData()
		fmt.Println("should respond")
		ShouldRespond = true
  })

  c.Start()

	http.ListenAndServe(":8000", handler)
}