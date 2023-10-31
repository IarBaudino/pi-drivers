import React from 'react';
import Card from '../../components/card/Card';
import styles from './cards.module.css';

const Cards = ({ drivers }) => {
  return (
    <div className={styles.containerCards}>
      {drivers.map(driver => (
        <Card
          key={driver.id}
          image={driver.image}
          name={driver.name}
          lastName={driver.lastName}
          teams={driver.teams}
        />
      ))}
    </div>
  );
};

export default Cards;
