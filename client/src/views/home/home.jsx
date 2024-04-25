import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, getDrivers, getTeams, restart, filterDriversByTeam, filterDriversBySource, sortDriversByName, sortDriversByBirthdate } from '../../redux/actions/actions'; // Asegúrate de importar las funciones de clasificación
import styles from '../home/home.module.css';
import Cards from "../../components/cards/cards";

function Home() {
  const dispatch = useDispatch();
  const allDrivers = useSelector(state => state.allDrivers);
  const currentPage = useSelector(state => state.currentPage);
  const allTeams = useSelector(state => state.allTeams);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [filters, setFilters] = useState({ team: '', source: '' });
  const [sorting, setSorting] = useState({ sortBy: '', sortOrder: '' });

  useEffect(() => {
    if (!allDrivers.length) {
      dispatch(getDrivers());
    }
    dispatch(getTeams());
  }, [dispatch, allDrivers]);

  useEffect(() => {
    dispatch(restart());
  }, [dispatch]);

  const handleTeamChange = (event) => {
    const selectedTeamName = event.target.value;
    const formattedTeamName = selectedTeamName.charAt(0).toUpperCase() + selectedTeamName.slice(1).toLowerCase();
    setSelectedTeam(formattedTeamName);
    setFilters({ ...filters, team: formattedTeamName });

    if (selectedTeamName) {
      dispatch(filterDriversByTeam(formattedTeamName));
    } else {
      dispatch(restart());
    }
  };

  const handleSourceChange = (event) => {
    const selectedSource = event.target.value;
    setSelectedSource(selectedSource);
    setFilters({ ...filters, source: selectedSource });

    if (selectedSource) {
      dispatch(filterDriversBySource(selectedSource));
    } else {
      dispatch(restart());
    }
  };

  const handleSortByName = () => {
    const newSortingOrder = sorting.sortOrder === 'asc' ? 'desc' : 'asc';
    setSorting({ sortBy: 'name', sortOrder: newSortingOrder });
    dispatch(sortDriversByName(newSortingOrder, selectedTeam, selectedSource));
  };

  const handleSortByBirthdate = () => {
    const newSortingOrder = sorting.sortOrder === 'asc' ? 'desc' : 'asc';
    setSorting({ sortBy: 'birthdate', sortOrder: newSortingOrder });
    dispatch(sortDriversByBirthdate(newSortingOrder, selectedTeam, selectedSource));
  };

  const pagination = (event) => {
    dispatch(changePage(event.target.name));
  };

  const resetFilters = () => {
    dispatch(restart());
    setSelectedTeam('');
    setSelectedSource('');
    setFilters({ team: '', source: '' });
    setSorting({ sortBy: '', sortOrder: '' });
  };

  return (
    <div className={styles.container}>
      <div>
        <h3>current page: {currentPage}</h3>
      </div>
      <div className={styles.buttons}>
        <button onClick={pagination} name='first' disabled={currentPage === 1}>{'<< First'}</button>
        <button onClick={pagination} name='prev' disabled={currentPage === 1}>{'<< Prev'}</button>
        <button onClick={pagination} name='next'>{">> Next"}</button>
        <button onClick={pagination} name='last'>{">> Last"}</button>
      </div>
      <div>
        <label className={styles.label}>TEAMS</label>
        <select onChange={handleTeamChange} className={styles.select} value={selectedTeam}>
          <option value="">All Teams</option>
          {allTeams.map((team, index) => (
            <option key={index} value={team}>{team}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={styles.label}>Source</label>
        <select onChange={handleSourceChange} className={styles.select} value={selectedSource}>
          <option value="">All Sources</option>
          <option value="db">Database</option>
          <option value="api">API</option>
        </select>
      </div>
      <div>
        <button onClick={handleSortByName}>Sort A-Z</button>
        <button onClick={handleSortByName}>Sort Z-A</button>
      </div>
      <div>
        <button onClick={handleSortByBirthdate}>Sort by BirthDate</button>
        <span>{sorting.sortOrder === 'asc' ? '↑' : '↓'}</span>
      </div>
      <div>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>
      <div className={styles.cardsContainer}>
        <Cards drivers={allDrivers} />
      </div>
    </div>
  );
}

export default Home;