import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrivers, paginatedDrivers } from '../../redux/actions/actions';
import styles from './home.module.css';
import Cards from '../../components/cards/Cards';

function Home() {
  const dispatch = useDispatch();
  const allDrivers = useSelector(state => state.allDrivers);

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  const paginated = event => {
    dispatch(paginatedDrivers(event.target.name));
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button name="prev" onClick={paginated}>
          PREV
        </button>
        <button name="next" onClick={paginated}>
          NEXT
        </button>
      </div>
      <div className={styles.cardsContainer}>
        <Cards />
      </div>
    </div>
  );
}

export default Home;


