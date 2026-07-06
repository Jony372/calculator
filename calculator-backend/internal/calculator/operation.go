package calculator

import (
	"errors"
	"math"
)

type MathOperation interface {
	Execute(a float64, b *float64) (float64, error)
}

type Addition struct{}

func (Addition) Execute(a float64, b *float64) (float64, error) {
	return a + *b, nil
}

type Subtraction struct{}

func (Subtraction) Execute(a float64, b *float64) (float64, error) {
	return a - *b, nil
}

type Multiplication struct{}

func (Multiplication) Execute(a float64, b *float64) (float64, error) {
	return a * *b, nil
}

type Division struct{}

func (Division) Execute(a float64, b *float64) (float64, error) {
	if *b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / *b, nil
}

type SquareRoot struct{}

func (SquareRoot) Execute(a float64, b *float64) (float64, error) {
	if a < 0 {
		return 0, errors.New("Cannot calculate square root of a negative number")
	}
	return math.Sqrt(a), nil
}

type Percentage struct{}

func (Percentage) Execute(a float64, b *float64) (float64, error) {
	return (a / 100) * (*b), nil
}

func GetOperation(operation string) (MathOperation, error){
	switch operation {
	case "addition": return Addition{}, nil
	case "subtraction": return Subtraction{}, nil
	case "multiplication": return Multiplication{}, nil
	case "division": return Division{}, nil
	case "square_root": return SquareRoot{}, nil
	case "percentage": return Percentage{}, nil
	default: return nil, errors.New("Invalid operation")
	}
}
