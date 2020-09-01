package main

import "fmt"

func main() {
	helloString := newGreeting() //creates variable without declaring variable type, go interprets it

	fmt.Println(helloString)
}

func newGreeting() string {
	return "Hello Wold"
}
