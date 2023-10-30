// Aquí importo las actions
import { GET_DRIVERS, GET_TEAMS, PAGINATED } from '../actions/actions';

const initialState = {
  allDrivers: [],
  allTeams: [],
  currentPage: 1, // Cambia el currentPage inicial a 1
  itemsPerPage: 9, // Define el número de elementos por página
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
        currentPage: 1, // Reinicia la página a 1 cuando obtienes nuevos conductores
      };
    case GET_TEAMS:
      console.log('Manejando la acción GET_TEAMS');
      return {
        ...state,
        allTeams: action.payload,
        
      };

    case PAGINATED:
      const totalPages = Math.ceil(state.allDrivers.length / state.itemsPerPage);
      let nextPage = state.currentPage;

      if (action.payload === 'next') {
        nextPage = Math.min(nextPage + 1, totalPages);
      } else if (action.payload === 'prev') {
        nextPage = Math.max(nextPage - 1, 1);
      }

      const startIndex = (nextPage - 1) * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;

      return {
        ...state,
        currentPage: nextPage,
        // Para mantener todos los conductores en el estado y paginar en función de la página actual
        paginatedDrivers: state.allDrivers.slice(startIndex, endIndex),
      };


    default:
      return state;
  }
}

export default rootReducer;