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
        let newPage;
      
        if (action.payload === 'first') {
          newPage = 1; // Ir a la primera página
        } else if (action.payload === 'last') {
          const totalPages = Math.ceil((state.filters ? state.driversFiltered.length : state.allDriversBackup.length) / ITEMS_PER_PAGE);
          newPage = totalPages; // Ir a la última página
        } else {
          if (action.payload === 'next') {
            newPage = state.currentPage + 1; // Siguiente página
          } else if (action.payload === 'prev') {
            newPage = state.currentPage - 1; // Página anterior
          }
      
          if (newPage < 1 || (newPage * ITEMS_PER_PAGE > state.allDriversBackup.length && !state.filters) || (newPage * ITEMS_PER_PAGE > state.driversFiltered.length && state.filters)) {
            return state; // No cambiamos nada si estamos fuera de los límites o no hay más datos
          }
        }
      
        const firstIndex = (newPage - 1) * ITEMS_PER_PAGE;
        const lastIndex = newPage * ITEMS_PER_PAGE;
      
        let driversToShow;
        if (state.filters) {
          driversToShow = state.driversFiltered.slice(firstIndex, lastIndex);
        } else {
          driversToShow = state.allDriversBackup.slice(firstIndex, lastIndex);
        }
      
        return {
          ...state,
          allDrivers: driversToShow,
          currentPage: newPage,
        };


    case RESET:
      return {
        ...state,
        allDrivers: state.allDriversBackup, // Restaurar todos los conductores de la copia de seguridad
        driversFiltered: [], // Restablecer los conductores filtrados
        currentPage: 1,  // Restablecer la página actual a 1
        filters: false, // Restablecer el estado de filtros
      };

    default:
      return state;
  }
}

export default rootReducer;