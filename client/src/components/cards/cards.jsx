import React from 'react';
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom'; // Importa Link
import styles from './cards.module.css';

const Cards = ({ drivers }) => {
  return (
    <div className={styles.containerCards}>
      {drivers.map(driver => (
        <Link to={`/home/${driver.id}`} key={driver.id}>
           <Card
            image={driver.image}
            name={driver.name}
            lastName={driver.lastName}
            teams={driver.teams}
          />
        </Link>
      ))}
    </div>
  );
};

export default Cards;