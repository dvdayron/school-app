
import {combineReducers} from 'redux';
import citiesReducer from './cities/cities.reducer';
import groupsReducer from './groups/groups.reducer';
import membersReducer from './members/members.reducer';
import dashboardReducer from './dashboard/dashboard.reducer';

/* 
 * Application reducers
 *
 * cities: City[] -  Get cities list
*/
const rootReducers = combineReducers({
  cities: citiesReducer,
  groups: groupsReducer,
  members: membersReducer,
  dashboard: dashboardReducer,
});

export default rootReducers;