import Types from './cities.types';
import {firestore} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: Types.FETCH_CITIES_START
});

export const fetchCollectionsSuccess = (cities) => ({
  type: Types.FETCH_CITIES_SUCCESS,
  payload: cities
});

export const fetchCollectionsFailure = (type, error) => ({
  type,
  payload: error
});

export const addCityStart = () => ({
  type: Types.ADD_CITIES_START
});

export const addCitySuccess = (city) => ({
  type: Types.ADD_CITIES_SUCCESS,
  payload: city
});

export const deleteCitySuccess = (id) => ({
  type: Types.DELETE_CITIES_SUCCESS,
  payload: id
});

export const editCitySuccess = (city) => ({
  type: Types.EDIT_CITIES_SUCCESS,
  payload: city
});

export const fetchCitiesStartAsync = () => {
  return dispatch => {
    dispatch(fetchCollectionsStart());
    const collectionsRef = firestore.collection('ciudades');
    collectionsRef
    .orderBy('createdAt', 'asc')
    .onSnapshot(snapshot => {
      const cities = [];
      snapshot.docs.forEach(doc => {
        const city = {
          id: doc.id,
          ...doc.data()
        };
        cities.push(city)
      });
      dispatch(fetchCollectionsSuccess(cities));
    });
  }
};

export const addCitiesStartAsync = (city) => {
  return dispatch => {
    dispatch(addCityStart());
    const collectionsRef = firestore.collection('ciudades');
    collectionsRef.add(city)
    .then(() => {
      dispatch(addCitySuccess(city));
    })
    .catch((error) => {
      dispatch(fetchCollectionsFailure(Types.ADD_CITIES_FAILURE, error));
    });
  }
};

export const deleteCityAsync = (id) => {
  return dispatch => {
    const collectionsRef = firestore.collection('ciudades')
    collectionsRef.doc(id)
    .delete()
    .then(() => {
      dispatch(deleteCitySuccess(id));
    });
  }
}

export const editCityAsync = (city) => {
  return dispatch => {
    const collectionsRef = firestore.collection('ciudades')
    collectionsRef.doc(city.id)
    .set({
      ...city,
      name: city.name
    })
    .then(() => {
      dispatch(editCitySuccess(city));
    });
  }
}