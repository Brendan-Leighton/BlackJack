import { useState } from 'react'
import './App.css'
import Deck from './services/Deck'
import Hand from './services/Hand'

function App() {

	const [deck, _setDeck] = useState(new Deck)
	const [hand, setHand] = useState(new Hand)


	function handleClick_deal() {
		setHand(new Hand(deck.draw(2)))
	}

	return (
		<>
			<button onClick={handleClick_deal}>Deal</button>

			{/* HAND */}
			<div className='players_hand'>
				<div className='hand_score'>
					Score: {hand.score[0]} {hand.score[0] !== hand.score[1] && ` / ${hand.score[1]}`}
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
		</>
	)
}

export default App
