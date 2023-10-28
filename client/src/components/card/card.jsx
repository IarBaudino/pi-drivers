import React from 'react';
import styles from '../card/card.module.css';

function Card({ id, image, name, lastName, teams }) {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={image} alt={name} />
      <h3 className={styles.name}>{name} {lastName}</h3>
      <p className={styles.teams}>{teams.join(', ')}</p>
    </div>
  );
}

export default Card;