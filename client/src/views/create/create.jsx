import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams, postDrivers } from '../../redux/actions/actions';
import { validate } from '../../utils/validate';
import styles from '../create/create.module.css';

const Create = () => {
  const dispatch = useDispatch();
  const allTeams = useSelector(state => state.allTeams);
  const [state, setState] = useState({
    name: '',
    lastName: '',
    description: '',
    image: '',
    nationality: '',
    birthDate: '',
    teams: []
  });

  const [errors, setErrors] = useState({});

  // Obtener los equipos cuando se monta el componente
  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

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
    const fieldErrors = validate(state);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length === 0) {
      dispatch(postDrivers(state));
    }
  };

  const handleResetForm = () => {
    setState({
      name: '',
      lastName: '',
      description: '',
      image: '',
      nationality: '',
      birthDate: '',
      teams: []
    });
    setErrors({});
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>NAME</label>
        <input onChange={handleChange} className={styles.input} type="text" name="name" placeholder="Only letters and spaces" />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        <label className={styles.label}>LAST NAME</label>
        <input onChange={handleChange} className={styles.input} type="text" name="lastName" placeholder="Only letters and spaces" />
        {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}

        <label className={styles.label}>DESCRIPTION</label>
        <input onChange={handleChange} className={styles.input} type="text" name="description" placeholder="2000 characters or less" />
        {errors.description && <p className={styles.error}>{errors.description}</p>}

        <label className={styles.label}>IMAGE</label>
        <input onChange={handleChange} className={styles.input} type="text" name="image" placeholder="Driver's Image URL" />
        {errors.image && <p className={styles.error}>{errors.image}</p>}

        <label className={styles.label}>NATIONALITY</label>
        <input onChange={handleChange} className={styles.input} type="text" name="nationality" placeholder="Driver's Nationality" />
        {errors.nationality && <p className={styles.error}>{errors.nationality}</p>}

        <label className={styles.label}>BIRTH DATE</label>
        <input onChange={handleChange} className={styles.input} type="date" name="birthDate" />
        {errors.birthDate && <p className={styles.error}>{errors.birthDate}</p>}

        <div>
          <label className={styles.label}>TEAMS</label>
          <select onChange={handleChange} className={styles.select} name="teams" id="teams" placeholder='Select a team/s'>
            {allTeams.map((team, index) => (
              <option key={index} value={team}>{team}</option>
            ))}
            <option value="">Select a team/s</option>
          </select>
          {errors.teams && <p className={styles.error}>{errors.teams}</p>}
        </div>
        {/* Mostrar equipos seleccionados */}
        <div>
          <label className={styles.label}>Selected Teams:</label>
          <div>
            {state.teams.map((team, index) => (
              <p key={index}>{team}</p>
            ))}
          </div>
        </div>
        <input  type="submit" />
        {/* Botón para limpiar el formulario */}
        <button type="button" onClick={handleResetForm}>Reset Form</button>
      </form>
    </div>
  );
};

export default Create;
