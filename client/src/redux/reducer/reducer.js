import {
  GET_DRIVERS,
  GET_BY_ID,
  GET_TEAMS,
  PAGINATION,
  GET_DRIVERS_NAME,
  RESET,
  FILTER_DRIVERS_BY_TEAM,
  FILTER_DRIVERS_BY_SOURCE,
  filterDriversBySource,
} from '../actions/actions';

const initialState = {
  allDrivers: [],
  allTeams: [],
  allDriversBackup: [],
  currentPage: 1,
  driversFiltered: [],
  driversByTeamFiltered: [],
  driversBySourceFiltered: [],
  filters: {
    name: '', // Nombre del conductor buscado
    team: '',
    source: '', // Nombre del equipo seleccionado
  },
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
        filters: {
          ...state.filters,
          name: action.payload,
        },
        currentPage: 1,
      };

      case FILTER_DRIVERS_BY_TEAM:
      const filteredByTeam = action.payload.filter(driver => {
        if (state.filters.name) {
          return driver.teamName === state.filters.team &&
                 driver.name.toLowerCase().includes(state.filters.name.toLowerCase());
        } else {
          return driver.teamName === state.filters.team;
        }
      });

      return {
        ...state,
        allDrivers: filteredByTeam.slice(0, ITEMS_PER_PAGE),
        driversByTeamFiltered: filteredByTeam,
        filters: {
          ...state.filters,
          team: action.payload,
        },
        currentPage: 1,
      };
      
      case FILTER_DRIVERS_BY_SOURCE:
        return {
          ...state,
          allDrivers: action.payload.slice(0, ITEMS_PER_PAGE),
          driversBySourceFiltered: driversBySource,
          filters: {
            ...state.filters,
            source: action.payload,
          },
          currentPage: 1,
        };

        case PAGINATION:
            let newPage;
            if (action.payload === 'first') {         
              newPage = 1; // Ir a la primera página
            } else if (action.payload === 'last') {         
              const totalDrivers =  
              (state.filters ? state.driversFiltered.length : state.allDriversBackup.length) +
              (state.filters ? state.driversByTeamFiltered.length : 0)+
              (state.filters ? state.driversBySourceFiltered.length : 0);

              const totalPages = Math.ceil(totalDrivers / ITEMS_PER_PAGE);
              newPage = totalPages; // Ir a la última página

            } else {
            if (action.payload === 'next') {
              newPage = state.currentPage + 1; // Siguiente página
              } else if (action.payload === 'prev') {
                newPage = state.currentPage - 1; // Página anterior
              }
            
              const totalDrivers = (state.filters ? state.driversFiltered.length : state.allDriversBackup.length) +
                                   (state.filters ? state.driversByTeamFiltered.length : 0) +
                                   (state.filters ? state.driversBySourceFiltered.length : 0);
            if (newPage < 1 || newPage > Math.ceil(totalDrivers / ITEMS_PER_PAGE)) {          
            return state; // No cambiamos nada si estamos fuera de los límites o no hay más datos
              }
            }
          
            const firstIndex = (newPage - 1) * ITEMS_PER_PAGE;
            const lastIndex = newPage * ITEMS_PER_PAGE;
          
            let driversToShow;
            if (state.filters) {
            if (state.driversFiltered.length > 0) {
            driversToShow = state.driversFiltered.slice(firstIndex, lastIndex);
            } else if (state.driversByTeamFiltered.length > 0) {
            driversToShow = state.driversByTeamFiltered.slice(firstIndex, lastIndex);
            } else if (state.driversBySourceFiltered.length > 0) { // Verificar si hay conductores filtrados por origen
              driversToShow = state.driversBySourceFiltered.slice(firstIndex, lastIndex); // Utilizar los conductores filtrados por origen
            } else {
              driversToShow = [];
            }
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