import {createSelector} from 'reselect';

const reducer = state => state.members;

export const selectMembers = createSelector(
  [reducer],
  (members) => members.members
);

export const selectIsFetching = createSelector(
  [reducer],
  (members) => members.isFetching
);