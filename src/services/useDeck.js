import React, { useEffect, useState } from "react";

export const useDeck = (numberOfDecks) => {
	const [deck, setDeck] = useState(createDeck(2))
	const [removedCards, setRemovedCards] = useState(createDeck(2))
	const [cardsRemaining, setCardsRemaining] = useState(numberOfDecks * 52)

	useEffect(() => {
		setDeck(shuffleDeck(createDeck(numberOfDecks)))
	}, [numberOfDecks])

	function createDeck(numberOfDecks = 1) {
		let suits = ['H', 'C', 'D', 'S'];
		let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
		let newDeck = [];

		// Looping 'suits'
		for (let suitCount = 0; suitCount < 4; suitCount++) {
			// Looping 'ranks'
			for (let rankCount = 0; rankCount < 13; rankCount++) {
				// Looping 'numberOfDecks'
				for (let amount = 0; amount < numberOfDecks; amount++) {
					newDeck.push(`${ranks[rankCount]} - ${suits[suitCount]}`);
				}
			}
		}

		return newDeck;
	}

	function shuffleDeck(deck) {
		console.log('shuffleDeck()');
		for (let i = 0; i < deck.length; i++) {
			let tempCard = deck[i];
			let randomIndex = Math.floor(Math.random() * deck.length);
			deck[i] = deck[randomIndex];
			deck[randomIndex] = tempCard;
		}
		console.log(deck);
		return deck
	}

	return deck;

}