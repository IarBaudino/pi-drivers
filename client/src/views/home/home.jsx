import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, getDrivers, getTeams } from '../../redux/actions/actions';
import styles from '../home/home.module.css';
import Cards from "../../components/cards/cards";

function Home() {
  const dispatch = useDispatch();
  const allDrivers = useSelector(state => state.allDrivers);
  const currentPage = useSelector(state => state.currentPage);

  useEffect(() => {
    if (!allDrivers.length) { // Comprobar si allDrivers está vacío
      dispatch(getDrivers());
    }
    dispatch(getTeams());
  }, [dispatch, allDrivers]);


  const pagination=(event)=>{
    dispatch(changePage(event.target.name))
  }
  

  return (
    <div className={styles.container}>
      <div>
        <h3>current page: { currentPage }</h3>
      </div>
      <div className={styles.buttons}>
       <button onClick={pagination} name='prev' disabled={currentPage === 1}>{'<<'}</button>
        <button onClick={pagination} name='next'>{">>"}</button>
      </div>
      <div className={styles.cardsContainer}>
        <Cards drivers={allDrivers} />
      </div>
    </div>
  );
}

export default Home;