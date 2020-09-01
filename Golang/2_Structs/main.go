package main

import "fmt"

type contactInfo struct {
	email   string
	zipCode int
}
type person struct {
	firstName string
	lastName  string
	contactInfo
}

func main() {
	jim := person{
		firstName: "Jim",
		lastName:  "Party",
		contactInfo: contactInfo{
			email:   "jim@gmail.com",
			zipCode: 96000,
		},
	}

	jim.updateName("jimmy")
	jim.print()

	//alternative long form
	donny := person{
		firstName: "Donald",
	}
	donnyPointer := &donny
	donnyPointer.updateName("Donny")
	donny.print()
}

//star means pointer to memory address
func (pointerToPerson *person) updateName(newFirstName string) {
	//star is memory address to object
	(*pointerToPerson).firstName = newFirstName
}

func (p person) print() {
	fmt.Printf("%+v", p)
}
