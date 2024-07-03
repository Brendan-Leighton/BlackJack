import React from 'react'

const cardValues = {
	'2': 2,
	'3': 3,
	'4': 4,
	'5': 5,
	'6': 6,
	'7': 7,
	'8': 8,
	'9': 9,
	'T': 10,
	'J': 10,
	'Q': 10,
	'K': 10,
	'A': 1
}

export default class Hand {
	constructor(cards = []) {
		this.cards = cards
		this.score = this.getHandScore(cards)
	}

	addCard(card) {
		this.cards.push(card)
		this.score = this.getHandScore(this.cards)
	}

	getHandScore(hand) {
		console.log(`\ngetHandScore:\n\tHand: ${hand}`);
		if (hand.length < 1) {
			console.log('\t... hand is empty');
			return 0
		}
		let score = [0, 0]

		hand.forEach(card => {
			console.log(`\tCard: ${card}`);

			const cardAmount = cardValues[card.charAt(0)]
			console.log(`\tcardAmount: ${cardAmount}`);
			score[0] += cardAmount
			score[1] += cardAmount

			if (cardAmount === 1) {
				score[1] += 10
			}

		})

		console.log(`\tScore: ${score}`);
		return score
	}
}