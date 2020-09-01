package main

import (
	"fmt"
)

func main() {

	cards := newDeck()
	cards.shuffle()
	mycard, restofDeck := deal(cards, 5)
	// restofDeck.print()
	nextHand, restoff := deal(restofDeck, 5)

	fmt.Println("Your Cards: ")
	mycard.print()
	fmt.Println("Next set of cards")
	nextHand.print()
	fmt.Println("remaining Cards")
	restoff.print()

}
