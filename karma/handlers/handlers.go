package handlers

import (
	"net/http"

	"github.com/gomodule/redigo/redis"
)


var Pool *redis.Pool
var ShouldRespond *bool

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	allowedOrigins := []string{"http://ncovgo.vercel.app", "https://ncovgo.vercel.app", "https://ncovgo.com", "http://ncovgo.com", "http://192.168.3.51:3000"}
	for _, allowedOrigin := range allowedOrigins { 
		if req.Header.Get("Origin") == allowedOrigin {
			(*w).Header().Set("Access-Control-Allow-Origin", allowedOrigin)
			(*w).Header().Set("Access-Control-Allow-Methods", "GET")
			(*w).Header().Set("Content-Type", "application/json")
			break
		}
	}
}