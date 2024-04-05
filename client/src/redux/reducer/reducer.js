import {
  GET_DRIVERS,
  GET_BY_ID,
  GET_TEAMS,
  PAGINATION,
  GET_DRIVERS_NAME,
  RESET,
} from '../actions/actions';

const initialState = {
  allDrivers: [],
  allTeams: [],
  allDriversBackup: [],
  currentPage: 0,
  driversFiltered: [],
  filters: false,

};

function rootReducer(state = initialState, action) {
  const ITEMS_PER_PAGE = 9;

  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: [...action.payload].splice(0, ITEMS_PER_PAGE),
        allDriversBackup: action.payload
      };

    case GET_BY_ID:
      return {
        ...state,
        allDrivers: action.payload,
      }

    case GET_TEAMS:
      return {
        ...state,
        allTeams:action.payload
      };

      case GET_DRIVERS_NAME:
        return {
          ...state,
          allDrivers: [...action.payload].splice(0, ITEMS_PER_PAGE),
          driversFiltered: action.payload,
          filters: true,
        
        }

    case PAGINATION:
      const next_page = state.currentPage + 1;
      const prev_page = state.currentPage - 1;
      const fisrtIndex = action.payload === 'next' ? next_page * ITEMS_PER_PAGE : prev_page * ITEMS_PER_PAGE;

      if(state.filters){
        if(action.payload === 'next' && fisrtIndex > state.driversFiltered.length) return state;
        if(action.payload === 'prev' && prev_page < 0) return state;
        return {
          ...state,
          allDrivers: [...state.driversFiltered].splice(fisrtIndex, ITEMS_PER_PAGE),
          currentPage: action.payload === 'next' ? next_page : prev_page
        }
      }

      if(action.payload === 'next' && fisrtIndex > state.allDriversBackup.length) return state;
      if(action.payload === 'prev' && prev_page < 0) return state;
        


      return {
        ...state,
        allDrivers: [...state.allDriversBackup].splice(fisrtIndex, ITEMS_PER_PAGE),
        currentPage: action.payload === 'next' ? next_page : prev_page
      }

      case RESET:
        return{
          ...state,
          allDrivers:[...state.allDriversBackup].splice(0, ITEMS_PER_PAGE),
          driversFiltered:[]
        }

      



    default:
      return state;
  }
}

export default rootReducer;