import React, { useEffect, useState } from 'react'
import styles from './DisplayScore.module.css'

export function DisplayScore({ scoreArray, isTurnOver }) {
	const [isBust, setIsBust] = useState(false)
	const [isBlackJack, setIsBlackJack] = useState(false)
	const [isScoresSame, setIsScoresSame] = useState(false)

	useEffect(() => {
		// BUST
		if (scoreArray[0] > 21) setIsBust(true)
		else setIsBust(false)

		// BLACK JACK
		if (scoreArray[0] === 21 || scoreArray[1] === 21) setIsBlackJack(true)
		else setIsBlackJack(false)

		// SCORES DIFFERENT WHEN AN ACE IS PRESENT
		if (scoreArray[0] === scoreArray[1]) setIsScoresSame(true)
		else setIsScoresSame(false)
	}, [scoreArray])

	useEffect(() => {
		if (!isTurnOver) {
			setIsBust(false)
			setIsBlackJack(false)
			setIsScoresSame(false)
		}
	}, [isTurnOver])

	return (
		<div className={styles.DisplayScore}>
			{
				isBust ?
					<div className="score_bust">
						BUST: <span className={styles.color_red}>{scoreArray[0]}</span>
					</div>
					: isBlackJack ?
						<div className="score_blackjack">
							Black Jack!: <span className={styles.color_green}>21</span>
						</div>
						: isTurnOver ? // when player "Stands" we only want to show their highest score
							<div className="score">
								Score: {scoreArray[1] < 22 ? scoreArray[1] : scoreArray[0]}
							</div>
							: // show both scores if they're different, else just show one score
							<div className="score">
								Score: {
									isScoresSame || scoreArray[1] > 21
										? scoreArray[0]
										: `${scoreArray[0]} / ${scoreArray[1]}`
								}
							</div>
			}
		</div>
	)
}
