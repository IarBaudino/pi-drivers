import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrivers, paginatedDrivers } from '../../redux/actions/actions';
import styles from '../home/home.module.css';
import Cards from '../../components/cards/Cards';

function Home() {
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.currentPage);
  const totalPages = useSelector(state => Math.ceil(state.allDrivers.length / 9));
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  const allDrivers = useSelector(state => state.allDrivers);

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  const paginated = (event, direction) => {
    event.preventDefault();
    if ((direction === 'prev' && hasPrevPage) || (direction === 'next' && hasNextPage)) {
      dispatch(paginatedDrivers(direction));
    }
  };


  // Calcular el índice de inicio y final para la página actual
  const driversPerPage = 9; // Número de conductores por página
  const startIndex = (currentPage - 1) * driversPerPage;
  const endIndex = startIndex + driversPerPage;

  // Filtrar los conductores según la página actual
  const driversToDisplay = allDrivers.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button name="prev" onClick={(e) => paginated(e, 'prev')} disabled={!hasPrevPage}>
          PREV
        </button>
        <button name="next" onClick={(e) => paginated(e, 'next')} disabled={!hasNextPage}>
          NEXT
        </button>
      </div>
      <div className={styles.cardsContainer}>
        <Cards drivers={driversToDisplay} />
      </div>
    </div>
  );
}

export default Home;