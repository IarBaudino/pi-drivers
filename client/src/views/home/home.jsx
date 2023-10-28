import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrivers, paginatedDrivers } from '../../redux/actions/actions';
import styles from './home.module.css';
import Cards from '../../components/cards/Cards';

function Home() {
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.currentPage);
  const totalPages = useSelector(state => Math.ceil(state.allDrivers.length / 9));
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  const paginated = event => {
    if (event.target.name === 'prev' && hasPrevPage) {
      dispatch(paginatedDrivers('prev'));
    } else if (event.target.name === 'next' && hasNextPage) {
      dispatch(paginatedDrivers('next'));
    }
    event.preventDefault();
  };

  console.log('currentPage:', currentPage); // Agrega este log para verificar currentPage
  console.log('totalPages:', totalPages); // Agrega este log para verificar totalPages
  console.log('hasPrevPage:', hasPrevPage); // Agrega este log para verificar hasPrevPage
  console.log('hasNextPage:', hasNextPage); // Agrega este log para verificar hasNextPage

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button name="prev" onClick={paginated} disabled={!hasPrevPage}>
          PREV
        </button>
        <button name="next" onClick={paginated} disabled={!hasNextPage}>
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
