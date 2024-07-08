import React, { useEffect, useState } from 'react'
import styles from './Game.module.css'
import { Deck, iCard } from './Objects'
import { DisplayScore, Hand } from './Components'

export default function Game() {
	// DEV ONLY
	// test cards can be applied in the 'handleClick_deal()' function,
	// uncomment the line between the comments // TESTING ONLY - ***
	const testCards_Player = [new iCard('S', 'J'), new iCard('C', '7')];
	const testCards_Dealer = [new iCard('S', 'J'), new iCard('C', '7')];

	//
	const [deck, setDeck] = useState()
	const [dealersScore, setDealersScore] = useState([0, 0])
	const [playersScore, setPlayersScore] = useState([0, 0])
	const [dealtCards, setDealtCards] = useState([[], []])
	const [isPlayersTurn, setIsPlayersTurn] = useState(true)
	const [isGameOver, setIsGameOver] = useState(true)
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
			setDealersScore(getDealersScore())
		}

		if (playersScore[0] === 21 || playersScore[1] === 21) {
			setIsPlayersTurn(false)
		}
	}, [playersScore])

	function getDealersScore() {
		const dealersUpdatedScore = [0, 0]
		dealtCards[0].forEach(card => {
			dealersUpdatedScore[0] += card.score[0]
			dealersUpdatedScore[1] += card.score[1]
		})
		return dealersUpdatedScore
	}

	/**
		Dealer's Turn handled here
	 */
	useEffect(() => {
		if (!isPlayersTurn && !isGameOver) checkDealersHand()
	}, [isPlayersTurn, dealersScore])

	function checkDealersHand() {
		console.log(`\ncheckDealersHand():`);

		const dealersUpdatedScore = getDealersScore()

		setDealersScore(dealersUpdatedScore)

		console.log(`\tScores: ${dealersUpdatedScore}`);

		// BUST
		if (dealersUpdatedScore[0] > 21) {
			console.log(`\tDealer Bust on ${dealersUpdatedScore[0]}`);
			setIsGameOver(true)
			setIsWinnerPlayer(true)
			return
		}

		// BLACK JACK
		if (dealersUpdatedScore[0] === 21 || dealersUpdatedScore[1] === 21) {
			setIsGameOver(true)
			if (playersScore[0] === 21 || playersScore[1] === 21) {
				setIsGameTie(true)
			}
			else setIsWinnerPlayer(false)
			console.log(`\tDealer BlackJack`);
			return
		}

		// STAND - end dealers turn and determine the winner
		if (dealersUpdatedScore[0] >= 17) {  // only checking dealer's score 0 so the dealer will try for a higher score if they have an ace buffer
			setIsGameOver(true)
			console.log(`\tDealer stops at ${dealersUpdatedScore[0]}`);
			// is either of player's score beating the dealers without busting?
			if ((playersScore[0] > dealersUpdatedScore[0] && playersScore[0] <= 21) || (playersScore[1] > dealersUpdatedScore[0] && playersScore[1] <= 21)) {
				let bestHand
				if (playersScore[1] > 21) bestHand = playersScore[0] // score 0 is best hand when score 1 busts
				else bestHand = playersScore[1] // else score 1 is the highest
				setIsWinnerPlayer(true)
				console.log(`Player wins with ${bestHand}`);
			}
			// is their a tie?
			else if (playersScore[0] === dealersUpdatedScore[0] || playersScore[1] === dealersUpdatedScore[0]) {
				setIsGameTie(true)
			}
			// else dealer wins
			else {
				setIsWinnerPlayer(false)
				console.log(`Dealer Wins`);
			}
			return
		}

		// HIT
		if (dealersUpdatedScore[0] < 17) {
			console.log(`\tDealer Hits`);
			setDealtCards(
				[
					[...dealtCards[0], ...deck.draw(1)], // dealer's cards
					dealtCards[1]												 // player's cards
				]
			)
		}
	}

	/**
	 * Deal 2 cards to player and dealer
	 */
	function handleClick_deal() {
		setDeck(new Deck)
		setDealtCards([[...deck.draw(2)], [...deck.draw(2)]])

		// TESTING ONLY - below
		// setDealtCards([testCards_Dealer, testCards_Player])
		// TESTING ONLY - above

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

	function gameOverMessage() {

		// if (!dealtCards[0].length) return "Click 'Deal' to start playing!"
		if (!isGameOver) return "Press 'Hit' for another card or 'Stand' to finish your turn"
		if (isGameTie) return "It's a Tie!"
		if (isGameOver && isWinnerPlayer) return "Player Wins"
		else return "Dealer Wins"

	}

	return (
		<div className={styles.Game}>

			<div className={styles.table}>
				{/* DEALERS HAND */}
				<div className='dealers_hand'>
					{/* <p>Dealer</p> */}
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

				<div className={styles.game_message}>
					{/* GAME STATE MESSAGES */}
					<p>
						{gameOverMessage()}
					</p>
				</div>

				{/* PLAYERS HAND */}
				<div className='players_hand'>
					{/* <p>You</p> */}
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

			{/* MAIN CONTROLS */}
			<button onClick={handleClick_deal} disabled={!isGameOver}>Deal</button>
			{/* PLAYER'S HAND CONTROLS */}
			<div className={styles.player_hand_controls}>
				< button onClick={handleClick_hit} disabled={!isPlayersTurn || !dealtCards[0].length}> Hit</button >
				<button onClick={handleClick_stand} disabled={!isPlayersTurn || !dealtCards[0].length}>Stand</button>
			</div>
		</div>
	)
}
