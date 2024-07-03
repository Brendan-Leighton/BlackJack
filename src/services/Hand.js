import React from 'react'

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
		console.log(`\ngetHandScore:\n\tHand: `, hand);
		let score = [0, 0]
		if (hand.length) {
			hand.forEach(card => {
				console.log(`\tCard:`, card);
				score[0] += card.score[0]
				score[1] += card.score[1]
			})
		}
		else console.log('\t... hand is empty');

		console.log(`\tScore: ${score}`);
		return score
	}
}