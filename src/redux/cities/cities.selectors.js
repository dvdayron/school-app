import {createSelector} from 'reselect';

const reducer = state => state.cities;

export const selectCities = createSelector(
  [reducer],
  (cities) => cities.cities
);

export const selectIsFetching = createSelector(
  [reducer],
  (cities) => cities.isFetching
);