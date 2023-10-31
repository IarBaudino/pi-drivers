import {
  GET_DRIVERS,
  PAGINATED,
  GET_TEAMS,
  UPDATE_TOTAL_PAGES, // Nueva acción
} from '../actions/actions';

const initialState = {
  allDrivers: [],
  allTeams: [],
  currentPage: 1,
  totalPages: 0, // Nuevo estado
  // ...otros estados
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
      };
    case GET_TEAMS:
      return {
        ...state,
        allTeams: action.payload,
      };
    case PAGINATED:
      return {
        ...state,
        currentPage:
          action.payload === 'next'
            ? state.currentPage + 1
            : state.currentPage - 1,
      };
    case UPDATE_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
