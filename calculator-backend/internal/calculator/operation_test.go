package calculator

import (
	"testing"
)

// Helper function to easily create float64 pointers for testing
// func floatPtr(val float64) *float64 {
// 	return &val
// }

func TestAddition(t *testing.T) {
	// Table-driven test structure definition
	tests := []struct {
		name        string
		numberA    float64
		numberB    *float64
		expectedRes float64
		expectError bool
	}{
		{"Positive numbers", 5.0, new(3.0), 8.0, false},
		{"Negative numbers", -5.0, new(-3.0), -8.0, false},
		{"Missing number B", 5.0, nil, 0, true},
	}

	operation := Addition{}

	// Iterate over the test cases
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, err := operation.Execute(tt.numberA, tt.numberB)

			// Assert error state
			if tt.expectError && err == nil {
				t.Errorf("expected an error but got none")
			}
			if !tt.expectError && err != nil {
				t.Errorf("did not expect an error but got: %v", err)
			}

			// Assert computation result
			if result != tt.expectedRes {
				t.Errorf("expected %v, got %v", tt.expectedRes, result)
			}
		})
	}
}

func TestDivision(t *testing.T) {
	tests := []struct {
		name        string
		numberA    float64
		numberB    *float64
		expectedRes float64
		expectError bool
	}{
		{"Normal division", 10.0, new(2.0), 5.0, false},
		{"Division by zero", 10.0, new(0.0), 0, true},
		{"Missing number B", 10.0, nil, 0, true},
	}

	operation := Division{}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, err := operation.Execute(tt.numberA, tt.numberB)

			if tt.expectError && err == nil {
				t.Errorf("expected an error but got none")
			}
			if !tt.expectError && err != nil {
				t.Errorf("did not expect an error but got: %v", err)
			}
			if result != tt.expectedRes {
				t.Errorf("expected %v, got %v", tt.expectedRes, result)
			}
		})
	}
}

func TestGetOperation(t *testing.T) {
	// Testing the Factory pattern resolution
	tests := []struct {
		opType      string
		expectError bool
	}{
		{"addition", false},
		{"subtraction", false},
		{"multiplication", false},
		{"division", false},
		{"invalid_op", true},
	}

	for _, tt := range tests {
		t.Run(tt.opType, func(t *testing.T) {
			_, err := GetOperation(tt.opType)
			
			if tt.expectError && err == nil {
				t.Errorf("expected error for invalid operation '%s', got none", tt.opType)
			}
			if !tt.expectError && err != nil {
				t.Errorf("did not expect error for valid operation '%s', got: %v", tt.opType, err)
			}
		})
	}
}