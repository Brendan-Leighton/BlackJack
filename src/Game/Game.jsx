import React, { useEffect, useState } from 'react'
import styles from './Game.module.css'
import { Deck, Hand } from './Objects'

export default function Game() {

	const [deck, _setDeck] = useState(new Deck)
	const [hand, setHand] = useState(new Hand)
	const [dealer, setDealer] = useState(new Hand)
	const [isBust, setIsBust] = useState(false)
	const [isBustDealer, setIsBustDealer] = useState(false)
	const [isBlackJack, setIsBlackJack] = useState(false)
	const [isBlackJackDealer, setIsBlackJackDealer] = useState(false)
	const [isPlayersTurn, setIsPlayersTurn] = useState(true)
	const [isGameOver, setIsGameOver] = useState(false)
	const [isWinnerPlayer, setIsWinnerPlayer] = useState(false)
	const [isDealerStand, setIsDealerStand] = useState(false)
	const [isDealerHit, setIsDealerHit] = useState(false)

	useEffect(() => {
		if (hand.score[0] > 21) {
			setIsBust(true)
			setIsGameOver(true)
		}
		else setIsBust(false)

		if (hand.score[0] === 21) {
			setIsBlackJack(true)
			setIsGameOver(true)
			setIsWinnerPlayer(true)
		}
		else setIsBlackJack(false)
	}, [hand])

	useEffect(() => {
		if (dealer.score[0] > 21) setIsBustDealer(true)
		else setIsBust(false)

		if (dealer.score[0] === 21) setIsBlackJackDealer(true)
		else setIsBlackJack(false)
	}, [dealer])

	useEffect(() => {
		if (isPlayersTurn) return
		console.log('\nDealers Turn');

		if (dealer.score[0] > 21) {
			console.log(`\tDealer Bust on ${dealer.score[0]}`);
			setIsBustDealer(true)
			setIsGameOver(true)
			setIsWinnerPlayer(true)
			return
		}
		if (dealer.score[0] === 21 || dealer.score[1] === 21) {
			setIsBlackJackDealer(true)
			setIsGameOver(true)
			setIsWinnerPlayer(false)
			console.log(`\tDealer BlackJack`);
			return
		}
		if (dealer.score[0] >= 17) {
			setIsGameOver(true)
			console.log(`\tDealer stops at ${dealer.score[0]}`);
			if ((hand.score[0] > dealer.score[0]) || (hand.score[1] > dealer.score[0])) {
				const bestHand = Math.max(hand.score[0], hand.score[1])
				setIsWinnerPlayer(true)
				console.log(`Player wins with ${bestHand}`);
			}
			else {
				setIsWinnerPlayer(false)
				console.log(`Dealer Wins`);
			}
			return
		}

		console.log(`\tDealer Hits`);
		setDealer(new Hand([...dealer.cards, ...deck.draw(1)]))

	}, [isPlayersTurn])

	function handleClick_deal() {
		setHand(new Hand(deck.draw(2)))
		setDealer(new Hand(deck.draw(2)))
	}

	function handleClick_hit() {
		setHand(new Hand([...hand.cards, ...deck.draw(1)]))
	}

	function handleClick_stand() {
		setIsPlayersTurn(false)
	}

	return (
		<>
			{isGameOver && <p>GAME OVER!</p>}
			{isBlackJackDealer && <p>Dealer has Black Jack!</p>}
			{isGameOver && (isWinnerPlayer ? <p>Player Wins</p> : <p>Dealer Wins</p>)}
			{/* MAIN CONTROLS */}
			<button onClick={handleClick_deal}>Deal</button>

			{/* DEALERS HAND */}
			<div className='dealers_hand'>

				{/* SCORE */}
				<div className='hand_score'>
					{
						isBustDealer ?
							<div className="score_bust">
								BUST: <span className={styles.color_red}>{dealer.score[0]}</span>
							</div>
							: isBlackJackDealer ?
								<div className="score_blackjack">
									Black Jack!: <span className={styles.color_green}>{dealer.score[0]}</span>
								</div>
								:
								<div className="score">
									Score: {dealer.score[0]} {(dealer.score[0] !== dealer.score[1] && dealer.score[1] < 22) && ` / ${dealer.score[1]}`}
								</div>
					}
				</div>

				{/* CARDS */}
				{
					dealer.cards.map((card, index) => {
						return (
							<span key={index}> {card.rank}{card.suit} </span>
						)
					})
				}
			</div>

			{/* PLAYERS HAND */}
			<div className='players_hand'>

				{/* SCORE */}
				<div className='hand_score'>
					{
						isBust ?
							<div className="score_bust">
								BUST: <span className={styles.color_red}>{hand.score[0]}</span>
							</div>
							: isBlackJack ?
								<div className="score_blackjack">
									Black Jack!: <span className={styles.color_green}>{hand.score[0]}</span>
								</div>
								:
								<div className="score">
									Score: {hand.score[0]} {(hand.score[0] !== hand.score[1] && hand.score[1] < 22) && ` / ${hand.score[1]}`}
								</div>
					}
				</div>

				{/* CARDS */}
				{
					hand.cards.map((card, index) => {
						return (
							<span key={index}> {card.rank}{card.suit} </span>
						)
					})
				}
			</div>

			{/* HAND CONTROLS */}
			<button onClick={handleClick_hit} disabled={isBust || !isPlayersTurn}>Hit</button>
			<button onClick={handleClick_stand} disabled={isBust || !isPlayersTurn}>Stand</button>
		</>
	)

}
