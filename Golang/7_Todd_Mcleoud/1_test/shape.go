package main

import (
	"math"
)

var radius float64

func circleArea(radius float64) float64 {
	return math.Pow(radius, 2) * math.Pi
}
