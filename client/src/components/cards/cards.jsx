import React from 'react';
import Card from '../../components/card/Card';
import { useSelector } from 'react-redux';
import styles from './cards.module.css';

const Cards = () => {
  const allDrivers = useSelector(state => state.allDrivers);

  return (
    <div className={styles.containerCards}>
      {allDrivers?.map(driver => (
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