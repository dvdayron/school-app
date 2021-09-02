import Types from './dashboard.types';

const INITIAL_STATE = {
  cities: 0,
  proffesors: 0,
  students: 0,
  groups: 0,
}

const dashboardReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case Types.SET_CITIES_COUNT:
      return {
        ...state, 
        cities: action.payload
      }
    case Types.SET_GROUPS_COUNT:
      return {
        ...state, 
        groups: action.payload
      }
    case Types.SET_PROFFESORS_COUNT:
      return {
        ...state, 
        proffesors: action.payload
      }
    case Types.SET_STUDENTS_COUNT:
      return {
        ...state, 
        students: action.payload
      }
    default: return state;
  }
}

export default dashboardReducer;