import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, getDrivers } from '../../redux/actions/actions';
import styles from '../home/home.module.css';
import Cards from '../../components/cards/Cards';

function Home() {
  const dispatch = useDispatch();
  const allDrivers = useSelector(state => state.allDrivers);
  const currentPage = useSelector(state => state.currentPage);

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);


  const pagination=(event)=>{
    dispatch(changePage(event.target.name))
  }

  return (
    <div className={styles.container}>
      <div>
        <h3>current page: { currentPage }</h3>
      </div>
      <div className={styles.buttons}>
        <button onClick={pagination} name='prev'>{"<<"}</button>
        <button onClick={pagination} name='next'>{">>"}</button>
      </div>
      <div className={styles.cardsContainer}>
        <Cards drivers={allDrivers} />
      </div>
    </div>
  );
}

export default Home;