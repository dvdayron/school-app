import Types from './members.types';

const INITIAL_STATE = {
  members: [],
  isFetching: false,
  error: ''
}

const membersReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case Types.FETCH_MEMBERS_START:
      return {
        ...state, 
        members: [],
        isFetching: true
      }
    case Types.FETCH_MEMBERS_SUCCESS:
      return {
        ...state, 
        members: action.payload,
        isFetching: false
      }
    case Types.FETCH_MEMBERS_FAILURE:
      return {
        ...state, 
        isFetching: false,
        error: action.payload
      }
    case Types.ADD_MEMBERS_START:
      return {
        ...state, 
        isFetching: true
      }
    case Types.ADD_MEMBERS_SUCCESS: 
      return {
        ...state, 
        members: [...state.members, action.payload],
        isFetching: false
      }
    case Types.DELETE_MEMBERS_SUCCESS: 
      return {
        ...state, 
        members: state.members.filter((member) => member.id !== action.payload)
      }
    case Types.EDIT_MEMBERS_SUCCESS: 
      return {
        ...state, 
        members: state.members.map((g) => g.id === action.payload.id 
        ? {
            ...g, 
            name: action.payload.name,
            email: action.payload.email,
            age: action.payload.age,
            cityId: action.payload.cityId,
            gender: action.payload.gender,
            groupId: action.payload.groupId,
            type: action.payload.type,
          } 
        : g )
      }
    default: return state;
  }
}

export default membersReducer;