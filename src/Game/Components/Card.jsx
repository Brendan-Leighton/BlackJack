import React from 'react'
import { ImSpades, ImClubs, ImHeart, ImDiamonds } from 'react-icons/im'
import styles from './Card.module.css'

export function Card({ rank, suit }) {
	return (
		<div className={styles.Card}> [{rank}{suit}] </div>
	)
}
