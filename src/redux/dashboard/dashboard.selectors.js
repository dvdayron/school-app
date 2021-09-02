import {createSelector} from 'reselect';

const reducer = state => state.dashboard;

export const selectCities = createSelector(
  [reducer],
  (dashboard) => dashboard.cities
);

export const selectGroups = createSelector(
  [reducer],
  (dashboard) => dashboard.groups
);

export const selectProffesors = createSelector(
  [reducer],
  (dashboard) => dashboard.proffesors
);

export const selectStudents = createSelector(
  [reducer],
  (dashboard) => dashboard.students
);