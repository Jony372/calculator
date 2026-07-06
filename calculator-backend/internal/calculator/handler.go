package calculator

import (
	"encoding/json"
	"net/http"
)

// CalculatorHandler is a struct that handles calculator requests and responses
type CalculatorHandler struct {}
// NewCalculatorHandler creates a new instance of CalculatorHandler
// (* and &) are used to create a pointer to the struct, allowing for efficient memory usage and the ability to modify the struct's fields directly.
func NewCalculatorHandler() *CalculatorHandler {
	return &CalculatorHandler{}
}

func (h *CalculatorHandler) ServeHTTP(w http.ResponseWriter, r *http.Request){
	// Enable CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "POST" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(CalculatorResponse{Error: "Method not allowed"})
		return 
	}

	var req CalculatorRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(CalculatorResponse{Error: "Invalid request body"})
		return
	}

	operation, err := GetOperation(req.Operation)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(CalculatorResponse{Error: err.Error()})
		return
	}

	result, err := operation.Execute(req.NumberA, &req.NumberB)
	if err != nil {
		w.WriteHeader(http.StatusUnprocessableEntity)
		json.NewEncoder(w).Encode(CalculatorResponse{Error: err.Error()})
		return
	}

	json.NewEncoder(w).Encode(CalculatorResponse{Result: &result})
}