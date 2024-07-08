import React from 'react'
import './App.css'
import Game from './Game'

function App() {

	return (
		<>
			<h1>BlackJack</h1>
			<p>This is a simple BlackJack game made for one person. There is no betting or persistant data at this time.</p>

			<h2 className='how-to-play'>How To Play</h2>
			<p>
				<ol className='controls'>
					<li>Press the Deal button to begin</li>
					<li>Press the Hit button until you're happy with your score. Try to get to 21 without going over!</li>
					<li>When you're happy with your score hit the 'Stand' button and the dealer will go</li>
					<li>All cards give a score equal to their assigned number with the exception that Aces are either 1 or 11, and all face cards are 10 points</li>
					<li>The dealer stops hitting when they have 17 or higher</li>
				</ol>
			</p>
			<Game />
		</>
	)
}

export default App
