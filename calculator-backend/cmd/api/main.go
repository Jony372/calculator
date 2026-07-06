package main

import (
	"calculator/internal/calculator"
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	calcHandler := calculator.NewCalculatorHandler()

	http.Handle("/api/calculate", calcHandler)

	log.Printf("Server starting on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("Server critical error: %s", err)
	}
}
