import Types from './groups.types';

const INITIAL_STATE = {
  groups: [],
  isFetching: false,
  error: '',
  students: [],
}

const groupsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case Types.FETCH_GROUPS_START:
      return {
        ...state, 
        isFetching: true
      }
    case Types.FETCH_GROUPS_SUCCESS:
      return {
        ...state, 
        groups: action.payload,
        isFetching: false
      }
    case Types.FETCH_GROUPS_FAILURE:
      return {
        ...state, 
        isFetching: false,
        error: action.payload
      }
    case Types.ADD_GROUPS_START:
      return {
        ...state, 
        isFetching: true
      }
    case Types.ADD_GROUPS_SUCCESS: 
      return {
        ...state, 
        groups: [...state.groups, action.payload],
        isFetching: false
      }
    case Types.DELETE_GROUPS_SUCCESS: 
      return {
        ...state, 
        groups: state.groups.filter((group) => group.id !== action.payload)
      }
    case Types.EDIT_GROUPS_SUCCESS: 
      return {
        ...state, 
        groups: state.groups.map((g) => g.id === action.payload.id ? {...g, name: action.payload.name} : g )
      }
    case Types.GET_GROUP_STUDENTS:
      return {
        ...state, 
        students: action.payload,
        isFetching: false
      }
    default: return state;
  }
}

export default groupsReducer;