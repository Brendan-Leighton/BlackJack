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
	// Unassigned rank/suit is used to hide the dealers 2nd card while it's the player's turn)
	if (rank === undefined || suit === undefined) {
		rank = '?'
		suit = '?'
	}

	let colorr;
	switch (suit) {
		case 'H':
		case 'D':
			colorr = 'red'
			break;
		case 'C':
		case 'S':
			colorr = 'black'
			break;
		default:
			colorr = 'blue'
	}
	return (
		<div className={styles.Card} style={{ color: colorr }}>
			<div className={styles.suit} style={{ textAlign: "right" }}>{suits[suit]}</div>
			<div className={styles.rank}>{rank}</div>
			<div className={styles.suit} style={{ textAlign: "left" }}>{suits[suit]}</div>
		</div >
	)
}
