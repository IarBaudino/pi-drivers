//aqui importo las actions
import { GET_DRIVERS, PAGINATED_DRIVERS } from '../actions/actions';

let initialState = {
    allDrivers: [],
    currentPage: 0,
}


function rootReducer(state = initialState, action) {
    const ITEMS_PER_PAGE = 9;
    const totalPages = Math.ceil(state.allDrivers.length / ITEMS_PER_PAGE); // Calcula el número total de páginas
  
    switch (action.type) {
      case GET_DRIVERS:
        return {
          ...state,
          allDrivers: action.payload,
        };
  
      case PAGINATED_DRIVERS:
        let nextPage = state.currentPage;
        if (action.payload === 'next') {
          nextPage++;
        } else if (action.payload === 'prev') {
          nextPage--;
        }
  
        nextPage = Math.max(1, Math.min(totalPages, nextPage)); // Asegúrate de que nextPage esté dentro de los límites
  
        const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
  
        return {
          ...state,
          allDrivers: state.allDrivers.slice(startIndex, endIndex),
          currentPage: nextPage,
        };
  
      default:
        return { ...state };
    }
  }

export default rootReducer;