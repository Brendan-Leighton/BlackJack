import React from 'react'
import { ImSpades, ImClubs, ImHeart, ImDiamonds } from 'react-icons/im'
import styles from './Card.module.css'

const suits = {
	'H': <ImHeart />,
	'D': <ImDiamonds />,
	'C': <ImClubs />,
	'S': <ImSpades />,
}

export function Card({ rank, suit }) {
	const colorr = suit === 'H' || suit === 'D' ? 'red' : 'black';
	return (
		<div className={styles.Card} style={{ color: colorr }}>
			<div className="suit" style={{ textAlign: "right" }}>{suits[suit]}</div>
			<div className="rank">{rank}</div>
			<div className="suit" style={{ textAlign: "left" }}>{suits[suit]}</div>
		</div >
	)
}
