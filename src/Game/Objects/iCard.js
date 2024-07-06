const cardValues = {
	'A': 1,
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
	'K': 10
}

export class iCard {
	isHidden = false
	constructor(suit, rank) {
		this.suit = suit
		this.rank = rank

		// SETTING SCORE
		const cardAmount = cardValues[rank]
		const score = [0, 0]
		score[0] += cardAmount
		score[1] += cardAmount
		if (cardAmount === 1) score[1] += 10
		this.score = score
	}
}