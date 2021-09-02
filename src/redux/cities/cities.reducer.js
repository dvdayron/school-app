import Types from './cities.types';

const INITIAL_STATE = {
  cities: [],
  isFetching: false,
  error: ''
}

const citiesReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case Types.FETCH_CITIES_START:
      return {
        ...state, 
        isFetching: true
      }
    case Types.FETCH_CITIES_SUCCESS:
      return {
        ...state, 
        cities: action.payload,
        isFetching: false
      }
    case Types.FETCH_CITIES_FAILURE:
      return {
        ...state, 
        isFetching: false,
        error: action.payload
      }
    case Types.ADD_CITIES_START:
      return {
        ...state, 
        isFetching: true
      }
    case Types.ADD_CITIES_SUCCESS: 
      return {
        ...state, 
        cities: [...state.cities, action.payload],
        isFetching: false
      }
    case Types.DELETE_CITIES_SUCCESS: 
      return {
        ...state, 
        cities: state.cities.filter((city) => city.id !== action.payload)
      }
    case Types.EDIT_CITIES_SUCCESS: 
      return {
        ...state, 
        cities: state.cities.map((c) => c.id === action.payload.id ? {...c, name: action.payload.name} : c )
      }
    default: return state;
  }
}

export default citiesReducer;