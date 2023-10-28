import axios from 'axios'

export const GET_DRIVERS = 'GET_DRIVERS'
export const PAGINATED_DRIVERS = 'PAGINATED_DRIVERS'


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

export function paginatedDrivers(payload) {
    return (dispatch) => {
        try {
            dispatch({
                type: 'PAGINATED_DRIVERS',
                payload: payload
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}