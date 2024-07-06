import { iCard } from './iCard'

export class Deck {

	constructor(numberOfDecks = 1) {
		this.deck = this.#shuffleDeck(this.#createDeck(numberOfDecks))
	}

	#createDeck(numberOfDecks) {
		const suits = ['H', 'C', 'D', 'S'];
		const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
		const newDeck = [];

		// Looping 'suits'
		for (let suitCount = 0; suitCount < 4; suitCount++) {
			// Looping 'ranks'
			for (let rankCount = 0; rankCount < 13; rankCount++) {
				// Looping 'numberOfDecks'
				for (let amount = 0; amount < numberOfDecks; amount++) {
					newDeck.push(new iCard(suits[suitCount], ranks[rankCount]))
				}
			}
		}

		return newDeck;
	}

	#shuffleDeck(deck) {
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

	/**
	 * 
	 * @param {number} amountToDraw - Amount of cards to draw
	 * @returns @type {Card} - Some number of Card objects
	 */
	draw(amountToDraw) {
		if (this.deck.length < amountToDraw) console.error('empty deck, cant draw another card')
		/** @type {Card[]} */
		const cards = []

		for (let i = 0; i < amountToDraw; i++) {
			cards.push(this.deck.pop())
		}

		return cards
	}

}