import {createSelector} from 'reselect';

const reducer = state => state.groups;

export const selectGroups = createSelector(
  [reducer],
  (groups) => groups.groups
);

export const selectStudents = createSelector(
  [reducer],
  (groups) => groups.students
);

export const selectIsFetching = createSelector(
  [reducer],
  (groups) => groups.isFetching
);