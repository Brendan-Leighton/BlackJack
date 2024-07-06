import React, { useEffect, useState } from 'react'
import styles from './Hand.module.css'
import { Card } from './Card'

export function Hand({ cards, isPlayer, isTurn, setDealersScore, setPlayersScore }) {

	useEffect(() => {
		if (cards === undefined || cards[0] === undefined || cards[1] === undefined) return

		if (!isPlayer && !isTurn) {
			cards[1].isHidden = true
			setDealersScore(cards[0].score)
			return
		}
		const newScore = getHandScore(cards)
		if (isPlayer) setPlayersScore(newScore)
		else setDealersScore(newScore)
	}, [cards])

	function getHandScore(hand) {
		// console.log(`\ngetHandScore:\n\tHand: `, hand);
		let score = [0, 0]
		if (hand.length) {
			hand.forEach(card => {
				// console.log(`\tCard:`, card);
				score[0] += card.score[0]
				score[1] += card.score[1]

				// CARD IS AN ACE
				if (card.score[0] < card.score[1]) {
					if (score[1] > 21) score[1] -= 10
				}
			})

		}
		// else console.log('\t... hand is empty');

		// console.log(`\tScore: ${score}`);
		return score
	}

	return (
		<div className={styles.Hand}>

			{/* CARDS */}
			<ul className={styles.cards}>
				{
					// render nothing when 'cards' is undefined (i.e. cards haven't been dealt yet)
					cards === undefined ? <><li></li><li></li></>
						: cards.map((card, index) => {
							return (
								// render both cards for the player OR for the dealer when it's their turn
								(index === 0) || (isPlayer || isTurn) ? (<li>
									<Card
										rank={card.rank}
										suit={card.suit}
									/>
								</li>) :
									// render dealer's card as hidden
									(<Card />)
							)
						})
				}
			</ul>
		</div>
	)
}
