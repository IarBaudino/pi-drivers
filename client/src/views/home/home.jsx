import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, getDrivers, getTeams, restart, filterDriversByTeam, filterDriversBySource } from '../../redux/actions/actions';
import styles from '../home/home.module.css';
import Cards from "../../components/cards/cards";

function Home() {
  const dispatch = useDispatch();
  const allDrivers = useSelector(state => state.allDrivers);
  const currentPage = useSelector(state => state.currentPage);
  const allTeams = useSelector(state => state.allTeams);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedSource, setSelectedSource] = useState(''); // Nuevo estado para el origen seleccionado

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
    
    if (selectedTeamName) {
      dispatch(filterDriversByTeam(formattedTeamName));
    } else {
      dispatch(restart())
    }
  };

  const handleSourceChange = (event) => { // Nuevo manejador de eventos para el cambio de origen
    const selectedSource = event.target.value;
    setSelectedSource(selectedSource);
    
    if (selectedSource) {
      dispatch(filterDriversBySource(selectedSource));
    } else {
      dispatch(restart())
    }
  };

  const pagination=(event)=>{
    dispatch(changePage(event.target.name))
  }

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
        <label className={styles.label}>Source</label> {/* Nuevo filtro por origen */}
        <select onChange={handleSourceChange} className={styles.select} value={selectedSource}>
          <option value="">All Sources</option>
          <option value="db">Database</option>
          <option value="api">API</option>
        </select>
      </div>
      <div className={styles.cardsContainer}>
        <Cards drivers={allDrivers} />
      </div>
    </div>
  );
}

export default Home;