package main

import "fmt"

func main() {
	//option 1 declared
	//var animals map[string]string

	//option 2 declared
	// colors := make(map[string]string)

	//option 3 declared and assigned
	colours := map[string]string{
		"red":   "#ff0000",
		"green": "#4bf745",
	}

	colours["white"] = "#fffff"
	colours["yellow"] = "laksjdf"

	delete(colours, "yellow")

	printMap(colours)

}

func printMap(c map[string]string) {
	for colour, hex := range c {
		fmt.Println("Hex code for", colour, "is", hex)
	}
}
