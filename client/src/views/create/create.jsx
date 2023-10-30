import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams, postDrivers } from '../../redux/actions/actions';
import styles from '../create/create.module.css';

const Create = () => {

  const dispatch = useDispatch()

  const allTeams = useSelector(state => state.allTeams)
  
  useEffect(() => {
    dispatch(getTeams())
  }, [dispatch])

  const [state, setState] = useState({
    name: '',
    lastName: '',
    description: '',
    image: '',
    nationality: '',
    birthDate: '',
    teams: []
  })


  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
  
    if (name === 'teams') {
      const selectedTeam = value.trim();
      setState((prevState) => ({
        ...prevState,
        teams: [...prevState.teams, selectedTeam],
      }));
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postDrivers(state))
  }

  return (
    <div className={styles.container}>
      {console.log(state)}
      <form className={styles.form} onSubmit={ handleSubmit }>

        <label className={styles.label}>NAME</label>
        <input onChange={handleChange} className={styles.input} type="text" name="name" placeholder="Driver's Name" />

        <label className={styles.label}>LAST NAME</label>
        <input onChange={handleChange} className={styles.input} type="text" name="lastName" placeholder="Driver's Last Name" />

        <label className={styles.label}>DESCRIPTION</label>
        <input onChange={handleChange} className={styles.input} type="text" name="description" placeholder="Driver Description" />

        <label className={styles.label}>IMAGE</label>
        <input onChange={handleChange} className={styles.input} type="text" name="image" placeholder="Driver's Image URL" />

        <label className={styles.label}>NATIONALITY</label>
        <input onChange={handleChange} className={styles.input} type="text" name="nationality" placeholder="Driver's Nationality" />

        <label className={styles.label}>BIRTH DATE</label>
        <input onChange={handleChange} className={styles.input} type="date" name="birthDate" />

        <div>
          <label className={styles.label}>TEAMS</label>
          <select onChange={handleChange} className={styles.select} name="teams" id="teams">
  {allTeams.map((team, index) => (
    <option key={index} value={team}>{team}</option>
  ))}
  <option value="">Select a Team</option>
</select>
        </div>

        <input type="submit" />

      </form>
    </div>
  );
}

export default Create;
