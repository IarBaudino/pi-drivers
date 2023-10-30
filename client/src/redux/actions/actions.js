import axios from 'axios'

export const GET_DRIVERS = 'GET_DRIVERS'
export const PAGINATED= 'PAGINATED'
export const GET_TEAMS = 'GET_TEAMS'



export function getDrivers() {
    return async function (dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/drivers')
            const drivers = response.data
            return dispatch({
                type: 'GET_DRIVERS',
                payload: drivers
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export function getTeams() {
    return async function (dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/teams')
            const teams = response.data
            console.log('Datos de equipos obtenidos:', teams);
            return dispatch({
                type: 'GET_TEAMS',
                payload: teams
            })
        }catch (error) {
            alert(error.response.data.error)
        }
    }
}

export function postDrivers (state) {
    return async function (dispatch) {
        try{
            await axios.post('http://localhost:3001/drivers', state)
        }catch (error) {
            alert(error.response.data.error)
        }
    }
    
}
export function paginatedDrivers(order) {
    return (dispatch) => {
        try {
            dispatch({
                type: PAGINATED,
                payload: order
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}