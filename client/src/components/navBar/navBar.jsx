import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './navBar.module.css';
import { Link } from 'react-router-dom';
import SearchBar from '../searchBar/searchBar';
import { restart, getTeams, changePage } from '../../redux/actions/actions';

const NavBar = () => {
  const dispatch = useDispatch();
 // const allTeams = useSelector(state => state.allTeams);
  //const currentPage = useSelector(state=>state.currentPage)

  

  const handleReset = () => {
    dispatch(restart()); // Reiniciamos el estado cuando se hace clic en el botón "Home"
    dispatch(changePage("first"))
    
  };


  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Link to="/" onClick={handleReset} className={styles.logoLink}>
        <img src="https://i.pinimg.com/564x/1a/4e/52/1a4e52dfe799dac527f42112bb84bc47.jpg" alt="logo" className={styles.logo} />
        <p className={styles.logoText}>START</p>
      </Link>
      <div>
        <Link to="/home" onClick={handleReset} >HOME</Link>
        <Link to="/create">CREATE</Link>
      </div>
      <div>
        <SearchBar />
      </div>
      
    </div>
  );
};

export default NavBar;