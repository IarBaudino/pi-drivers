import {
  GET_DRIVERS,
  GET_BY_ID,
  GET_TEAMS,
  PAGINATION,
  GET_DRIVERS_NAME,
  RESET,
  FILTER_DRIVERS_BY_TEAM,
} from '../actions/actions';

const initialState = {
  allDrivers: [],
  allTeams: [],
  allDriversBackup: [],
  currentPage: 1,
  driversFiltered: [],
  driversByTeamFiltered: [],
  filters: false,
};

function rootReducer(state = initialState, action) {
  const ITEMS_PER_PAGE = 9;

  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload.slice(0, ITEMS_PER_PAGE),
        allDriversBackup: action.payload,
      };

    case GET_BY_ID:
      return {
        ...state,
        allDrivers: action.payload,
      };

    case GET_TEAMS:
      return {
        ...state,
        allTeams: action.payload,
      };

    case GET_DRIVERS_NAME:
      return {
        ...state,
        allDrivers: action.payload.slice(0, ITEMS_PER_PAGE),
        driversFiltered: action.payload,
        filters: true,
        currentPage: 1,
      };

    case FILTER_DRIVERS_BY_TEAM:
      return {
        ...state,
        driversByTeamFiltered: action.payload,
      };

      case PAGINATION:
        const nextPage = action.payload === 'next' ? state.currentPage + 1 : state.currentPage - 1;
  
        if (nextPage < 1 || (nextPage * ITEMS_PER_PAGE > state.allDriversBackup.length && !state.filters) || (nextPage * ITEMS_PER_PAGE > state.driversFiltered.length && state.filters)) {
          return state; // No cambiamos nada si estamos fuera de los límites o no hay más datos
        }
  
        const firstIndex = (nextPage - 1) * ITEMS_PER_PAGE;
        const lastIndex = nextPage * ITEMS_PER_PAGE;
  
        let driversToShow;
        if (state.filters) {
          driversToShow = state.driversFiltered.slice(firstIndex, lastIndex);
        } else {
          driversToShow = state.allDriversBackup.slice(firstIndex, lastIndex);
        }
  
        return {
          ...state,
          allDrivers: driversToShow,
          currentPage: nextPage,
        };
  
        case RESET:
        return {
        ...state,
        allDrivers: state.allDriversBackup, // Restaurar todos los conductores de la copia de seguridad
        driversFiltered: [], // Restablecer los conductores filtrados
        currentPage: 1, // Restablecer la página actual a 1
        filters: false, // Restablecer el estado de filtros
      };
  
      default:
        return state;
    }
  }
  
  export default rootReducer;