import React, { useEffect, useState } from 'react'
import styles from './Game.module.css'
import { Deck, iCard } from './Objects'
import { DisplayScore, Hand } from './Components'

export default function Game() {
	// DEV ONLY
	const tempCards = [new iCard('S', 'A'), new iCard('C', 'A'), new iCard('S', 'A'), new iCard('C', 'A'), new iCard('S', 'A'), new iCard('C', 'A'), new iCard('S', 'A'), new iCard('C', 'A')];

	//
	const [deck, setDeck] = useState()
	const [dealersScore, setDealersScore] = useState([0, 0])
	const [playersScore, setPlayersScore] = useState([0, 0])
	const [dealtCards, setDealtCards] = useState([[], []])
	const [isPlayersTurn, setIsPlayersTurn] = useState(true)
	const [isGameOver, setIsGameOver] = useState(false)
	const [isWinnerPlayer, setIsWinnerPlayer] = useState(false)
	const [isGameTie, setIsGameTie] = useState(false)


	useEffect(() => {
		setDeck(new Deck())
	}, [])

	/**
		CHECK PLAYER'S HAND FOR TURN-ENDING SCORE
	 */
	useEffect(() => {
		// Check player's score for a bust, in which they instantly lose the round
		if (playersScore[0] > 21) {
			setIsPlayersTurn(false)
			setIsGameOver(true)
			setIsWinnerPlayer(false)
		}

		if (playersScore[0] === 21 || playersScore[1] === 21) {
			setIsPlayersTurn(false)
		}
	}, [playersScore])

	/**
		Dealer's Turn handled here
	 */
	useEffect(() => {
		if (!isPlayersTurn && !isGameOver) checkDealersHand()
	}, [isPlayersTurn, dealersScore])

	function checkDealersHand() {

		// BUST
		if (dealersScore[0] > 21) {
			console.log(`\tDealer Bust on ${dealersScore[0]}`);
			setIsGameOver(true)
			setIsWinnerPlayer(true)
			return
		}

		// BLACK JACK
		if (dealersScore[0] === 21 || dealersScore[1] === 21) {
			setIsGameOver(true)
			if (playersScore[0] === 21 || playersScore[1] === 21) {
				setIsGameTie(true)
			}
			else setIsWinnerPlayer(false)
			console.log(`\tDealer BlackJack`);
			return
		}

		// STAND - end dealers turn and determine the winner
		if (dealersScore[0] >= 17) {
			setIsGameOver(true)
			console.log(`\tDealer stops at ${dealersScore[0]}`);
			if ((playersScore[0] > dealersScore[0] && playersScore[0] <= 21) || (playersScore[1] > dealersScore[0] && playersScore[1] <= 21)) {
				let bestHand
				if (playersScore[1] > 21) bestHand = playersScore[0]
				else bestHand = Math.max(playersScore[0], playersScore[1])
				setIsWinnerPlayer(true)
				console.log(`Player wins with ${bestHand}`);
			}
			else if (playersScore[0] === dealersScore[0] || playersScore[0] === dealersScore[0]) {
				setIsGameTie(true)
			}
			else {
				setIsWinnerPlayer(false)
				console.log(`Dealer Wins`);
			}
			return
		}

		// HIT
		if (dealersScore[0] < 17) {
			console.log(`\tDealer Hits`);
			setDealtCards([[...dealtCards[0], ...deck.draw(1)], dealtCards[1]])
		}
	}

	/**
	 * Deal 2 cards to player and dealer
	 */
	function handleClick_deal() {
		setDeck(new Deck)
		setDealtCards([[...deck.draw(2)], [...deck.draw(2)]])
		// setDealtCards([[...deck.draw(2)], tempCards])
		// RESET STATE
		setIsGameOver(false)
		setIsGameTie(false)
		setIsPlayersTurn(true)
	}

	/**
	 * Lets the player 'Hit' - get another card for their hand
	 */
	function handleClick_hit() {
		console.log('handleClick_hit()')
		dealtCards[1] = [...dealtCards[1], ...deck.draw(1)]
		setDealtCards([...dealtCards])
	}

	/**
	 * Allow the player to 'Stand' - end their turn
	 */
	function handleClick_stand() {
		setIsPlayersTurn(false)
	}

	return (
		<div className={styles.Game}>

			<div className={styles.game_message}>
				{/* GAME STATE MESSAGES */}
				{!dealtCards[0].length && <p>Click 'Deal' to start playing!</p>}
				{/* {isGameOver && <p>GAME OVER!</p>} */}
				{isGameTie && <p>It's a Tie!</p>}
				{isGameOver && ((!isGameTie && isWinnerPlayer) ? <p>Player Wins</p> : <p>Dealer Wins</p>)}
			</div>

			{/* MAIN CONTROLS */}
			<button onClick={handleClick_deal}>Deal</button>

			<div className={styles.table}>
				{/* DEALERS HAND */}
				<div className='dealers_hand'>
					<p>Dealer</p>
					<DisplayScore
						scoreArray={dealersScore}
					/>
					<Hand
						isPlayer={false}
						isTurn={!isPlayersTurn}
						cards={dealtCards[0]}
						setDealersScore={setDealersScore}
					/>
				</div>

				{/* PLAYERS HAND */}
				<div className='players_hand'>
					<p>You</p>
					<DisplayScore
						isTurnOver={!isPlayersTurn}
						scoreArray={playersScore}
					/>
					<Hand
						isPlayer={true}
						isTurn={isPlayersTurn}
						cards={dealtCards[1]}
						setPlayersScore={setPlayersScore}
					/>
				</div >
			</div>

			<div className={styles.player_hand_controls}>
				{/* PLAYER'S HAND CONTROLS */}
				< button onClick={handleClick_hit} disabled={!isPlayersTurn || !dealtCards[0].length}> Hit</button >
				<button onClick={handleClick_stand} disabled={!isPlayersTurn || !dealtCards[0].length}>Stand</button>
			</div>
		</div>
	)
}
