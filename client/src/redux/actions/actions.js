// actions.js

import axios from 'axios';

export const GET_DRIVERS = 'GET_DRIVERS';
export const PAGINATED = 'PAGINATED';
export const GET_TEAMS = 'GET_TEAMS';
export const UPDATE_TOTAL_PAGES = 'UPDATE_TOTAL_PAGES';
export const GET_BY_ID = 'GET_BY_ID';

export function getDrivers() {
  return async function (dispatch) {
    try {
      const response = await axios.get('http://localhost:3001/drivers');
      const drivers = response.data;
      dispatch({
        type: 'GET_DRIVERS',
        payload: drivers,
      });

      // Calcula y actualiza totalPages
      const totalPages = Math.ceil(drivers.length / 9);
      dispatch(updateTotalPages(totalPages));
    } catch (error) {
      alert(error.response.data.error);
    }
  };
}


export function getByID(id) {
  return async function (dispatch) {
    try {
      console.log('Paso 3 - Solicitando datos del conductor con ID:', id);
      const response = await axios.get(`http://localhost:3001/drivers/${id}`);
      const driverId = response.data;
      console.log('Paso 4 - Datos del conductor recibidos:', driverId);
      dispatch({
        type: GET_BY_ID,
        payload: driverId,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  }
}

export function getTeams() {
  return async function (dispatch) {
    try {
      const response = await axios.get('http://localhost:3001/teams');
      const teams = response.data;
      dispatch({
        type: GET_TEAMS,
        payload: teams,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  }
}

export function postDrivers(state) {
  return async function (dispatch) {
    try {
      await axios.post('http://localhost:3001/drivers', state);
      alert('Driver created successfully!');
    } catch (error) {
      alert("Error creating driver: " + error.response.data.error);
    }
  }
}

export function paginatedDrivers(order) {
  return (dispatch) => {
    try {
      dispatch({
        type: PAGINATED,
        payload: order,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  }
}

export function updateTotalPages(totalPages) {
  return {
    type: UPDATE_TOTAL_PAGES,
    payload: totalPages,
  };
}


