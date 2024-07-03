import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDeck } from './services/useDeck'

function App() {

	const deck = useDeck(1);

	const [hand, setHand] = useState(['card1', 'card2'])

	return (
		<>
			{
				hand.map((card, index) => {
					return (
						<>
							<div>{card} </div>
						</>
					)
				})
			}
		</>
	)
}

export default App
