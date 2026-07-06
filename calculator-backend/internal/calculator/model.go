package calculator

type CalculatorRequest struct {
	Operation string `json:"operation"`
	NumberA   float64 `json:"numberA"`
	NumberB   float64 `json:"numberB,omitempty"`
}

type CalculatorResponse struct {
	// Pointer (*) to prevent omitempty from hiding a valid 0 result
	Result float64 `json:"result,omitempty"`
	Error string `json:"error,omitempty"`
}