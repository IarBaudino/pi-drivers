//aqui importo las actions
import { GET_DRIVERS, PAGINATED_DRIVERS } from '../actions/actions';

let initialState = {
    allDrivers: [],
    currentPage: 0,
}


function rootReducer(state = {}, action) {
    const ITEMS_PER_PAGE = 9;

    switch (action.type) {
        case GET_DRIVERS:
            return {
                ...state,
                allDrivers: action.payload
            };
        case PAGINATED_DRIVERS:
            const nextPage = action.payload === 'next' ? state.currentPage + 1 : state.currentPage - 1;
            const startIndex = nextPage * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            return {
                ...state,
                allDrivers: state.allDrivers.slice(startIndex, endIndex),
                currentPage: nextPage,
            }

        default:
            return { ...state }
    }

}

export default rootReducer;