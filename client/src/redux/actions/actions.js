import axios from 'axios';

export const GET_DRIVERS = 'GET_DRIVERS';
export const GET_TEAMS = 'GET_TEAMS';
export const GET_BY_ID = 'GET_BY_ID';
export const GET_DRIVERS_NAME = 'GET_DRIVERS_NAME';
export const FILTER_DRIVERS_BY_TEAM = 'FILTER_DRIVERS_BY_TEAM';
export const PAGINATION = 'PAGINATION';
export const RESET =  "RESET";


export function getDrivers() {
  return async function (dispatch) {
    try {
      const response = await axios.get('http://localhost:3001/drivers');
      const drivers = response.data;
      dispatch({
        type: GET_DRIVERS,
        payload: drivers,
      });

    } catch (error) {
      alert(error.response.data.error);
    }
  };
}

export function driverByName(driver) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/drivers?name=${driver}`);

      dispatch({
        type: GET_DRIVERS_NAME,
        payload: response.data,

      });
    } catch (error) {
      alert(error.response.data.error);
    }
  }

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

export function filterDriversByTeam(teamName) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/drivers?teamName="${teamName}"`);

      dispatch({
        type: FILTER_DRIVERS_BY_TEAM,
        payload: response.data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
}

export function changePage(order) {
  return async function (dispatch) {
    try {
      dispatch({
        type: PAGINATION,
        payload: order,
      })
    } catch (error) {
      alert(error.response.data.error);
    }
  }
}

export function restart() {
  return async function (dispatch) {
    try {
      dispatch({
        type: RESET,
      })

    } catch (error) {
      alert(error.response.data.error)
    }
  }
}



