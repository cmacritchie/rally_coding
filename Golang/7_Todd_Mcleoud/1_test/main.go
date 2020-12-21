package main

import (
	"fmt"
)

func main() {
	fmt.Print("Enter a Radius Length: ")
	fmt.Scan(&radius)
	circle := circleArea(radius)
	fmt.Println("a circle with a radius of ", radius, " has an area of ", circle)
}
