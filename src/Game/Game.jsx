import React, { useEffect, useState } from 'react'
import styles from './Game.module.css'
import { Deck, Hand } from './Objects'
import { Card } from './Components'

export default function Game() {

	const [deck, setDeck] = useState()
	const [hand, setHand] = useState(new Hand)
	const [dealer, setDealer] = useState(new Hand)
	const [isBust, setIsBust] = useState(false)
	const [isBustDealer, setIsBustDealer] = useState(false)
	const [isBlackJack, setIsBlackJack] = useState(false)
	const [isBlackJackDealer, setIsBlackJackDealer] = useState(false)
	const [isPlayersTurn, setIsPlayersTurn] = useState(true)
	const [isGameOver, setIsGameOver] = useState(false)
	const [isWinnerPlayer, setIsWinnerPlayer] = useState(false)
	const [isGameTie, setIsGameTie] = useState(false)

	useEffect(() => {
		setDeck(new Deck)
	}, [])

	/**
		Check player's hand score when it changes
	 */
	useEffect(() => {
		// BUST
		if (hand.score[0] > 21) {
			setIsBust(true)
			setIsGameOver(true)
		}
		else setIsBust(false)

		// BLACK JACK
		if (hand.score[0] === 21) {
			setIsBlackJack(true)
			setIsGameOver(true)
			setIsWinnerPlayer(true)
		}
		else setIsBlackJack(false)
	}, [hand])

	/**
		Dealer's Turn handled here
	 */
	useEffect(() => {
		if (isPlayersTurn) return

		// BUST
		if (dealer.score[0] > 21) {
			console.log(`\tDealer Bust on ${dealer.score[0]}`);
			setIsBustDealer(true)
			setIsGameOver(true)
			setIsWinnerPlayer(true)
			return
		}

		// BLACK JACK
		if (dealer.score[0] === 21 || dealer.score[1] === 21) {
			setIsBlackJackDealer(true)
			setIsGameOver(true)
			setIsWinnerPlayer(false)
			console.log(`\tDealer BlackJack`);
			return
		}

		// STAND
		if (dealer.score[0] >= 17) {
			setIsGameOver(true)
			console.log(`\tDealer stops at ${dealer.score[0]}`);
			if ((hand.score[0] > dealer.score[0]) || (hand.score[1] > dealer.score[0])) {
				const bestHand = Math.max(hand.score[0], hand.score[1])
				setIsWinnerPlayer(true)
				console.log(`Player wins with ${bestHand}`);
			}
			else if (hand.score[0] === dealer.score[0] || hand.score[0] === dealer.score[0]) {
				setIsGameTie(true)
			}
			else {
				setIsWinnerPlayer(false)
				console.log(`Dealer Wins`);
			}
			return
		}

		// HIT
		console.log(`\tDealer Hits`);
		setDealer(new Hand([...dealer.cards, ...deck.draw(1)]))
	}, [dealer, isPlayersTurn])

	/**
		Reset state when player's turn begins
	 */
	useEffect(() => {
		if (isPlayersTurn) console.log('Players Turn');
		else console.log('\nDealers Turn');

	}, [isPlayersTurn])

	/**
	 * Deal 2 cards to player and dealer
	 */
	function handleClick_deal() {
		setHand(new Hand(deck.draw(2)))
		setDealer(new Hand(deck.draw(2)))
		// RESET STATE
		setIsBlackJack(false)
		setIsBlackJackDealer(false)
		setIsBust(false)
		setIsBustDealer(false)
		setIsGameOver(false)
		setIsGameTie(false)
		setIsPlayersTurn(true)
	}

	/**
	 * Lets the player 'Hit' - get another card for their hand
	 */
	function handleClick_hit() {
		setHand(new Hand([...hand.cards, ...deck.draw(1)]))
	}

	/**
	 * Allow the player to 'Stand' - end their turn
	 */
	function handleClick_stand() {
		setIsPlayersTurn(false)
	}

	return (
		<>
			{/* GAME STATE MESSAGES */}
			{isGameOver && <p>GAME OVER!</p>}
			{isBlackJackDealer && <p>Dealer has Black Jack!</p>}
			{isGameTie && <p>It's a Tie!</p>}
			{isGameOver && (isWinnerPlayer ? <p>Player Wins</p> : <p>Dealer Wins</p>)}

			{/* MAIN CONTROLS */}
			<button onClick={handleClick_deal}>Deal</button>

			{/* DEALERS HAND */}
			<div className='dealers_hand'>
				{/* DEALERS SCORE */}
				<div className='hand_score'>
					{
						isPlayersTurn ? // dealer's second card is hidden therefor the score is unknown
							<div className="score">
								Score: ?
							</div>
							: isBustDealer ?
								<div className="score_bust">
									BUST: <span className={styles.color_red}>{dealer.score[0]}</span>
								</div>
								: isBlackJackDealer ?
									<div className="score_blackjack">
										Black Jack!: <span className={styles.color_green}>21</span>
									</div>
									: //
									<div className="score">
										Score: {dealer.score[0]} {(dealer.score[0] !== dealer.score[1] && dealer.score[1] < 22) && ` / ${dealer.score[1]}`}
									</div>
					}
				</div>
				{/* DEALERS CARDS */}
				{
					isPlayersTurn ?
						<span>{dealer.cards.length && dealer.cards[0].suit}{dealer.cards.length && dealer.cards[0].rank} ? </span>
						: dealer.cards.map((card, index) => {
							return (
								<span key={index}> {card.rank}{card.suit} </span>
							)
						})
				}
			</div>

			{/* PLAYERS HAND */}
			<div className='players_hand'>
				{/* PLAYERS SCORE */}
				<div className='hand_score'>
					{
						isBust ?
							<div className="score_bust">
								BUST: <span className={styles.color_red}>{hand.score[0]}</span>
							</div>
							: isBlackJack ?
								<div className="score_blackjack">
									Black Jack!: <span className={styles.color_green}>21</span>
								</div>
								: !isPlayersTurn ? // when player "Stands" we only want to show their highest score
									<div className="score">
										Score: {hand.score[1] < 22 ? hand.score[1] : hand.score[0]}
									</div>
									: // show both scores if they're different, else just show one score
									<div className="score">
										Score: {hand.score[0]} {(hand.score[0] !== hand.score[1] && hand.score[1] < 22) && ` / ${hand.score[1]}`}
									</div>
					}
				</div>
				{/* PLAYERS CARDS */}
				{
					<ul>
						{
							hand.cards.map((card, index) => {
								return (
									<li key={index}>
										<Card
											rank={card.rank}
											suit={card.suit}
										/>
									</li>
								)
							})
						}
					</ul>
				}
			</div>

			{/* PLAYER'S HAND CONTROLS */}
			<button onClick={handleClick_hit} disabled={isBust || !isPlayersTurn}>Hit</button>
			<button onClick={handleClick_stand} disabled={isBust || !isPlayersTurn}>Stand</button>
		</>
	)

}
