import React from 'react';
import styles from '../card/card.module.css';

function Card({ id, image, name, lastName, teams, birthDate }) {
  // Formatear la fecha de nacimiento en el formato deseado
  const formattedBirthDate = new Date(birthDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className={styles.card}>
      <img className={styles.image} src={image} alt={name} />
      <h3 className={styles.name}>{name} {lastName}</h3>
      <p className={styles.birthDate}>Birth Date: {formattedBirthDate}</p>
      <p className={styles.teams}>Teams: {teams.join(', ')}</p>
    </div>
  );
}

export default Card;
