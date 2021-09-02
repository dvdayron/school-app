import Types from './dashboard.types';
import {firestore} from '../../firebase/firebase.utils';

export const setCitiesCount = (count) => ({
  type: Types.SET_CITIES_COUNT,
  payload: count
});

export const getCitiesCountAsync = () => {
  return dispatch => {
    const collectionsRef = firestore.collection('ciudades');
    collectionsRef
    .onSnapshot(snapshot => {
      dispatch(setCitiesCount(snapshot.docs ? snapshot.docs.length : 0));
    });
  }
};

export const setGroupsCount = (count) => ({
  type: Types.SET_GROUPS_COUNT,
  payload: count
});

export const getGroupsCountAsync = () => {
  return dispatch => {
    const collectionsRef = firestore.collection('grupos');
    collectionsRef
    .onSnapshot(snapshot => {
      dispatch(setGroupsCount(snapshot.docs ? snapshot.docs.length : 0));
    });
  }
};

export const setProffesorsCount = (count) => ({
  type: Types.SET_PROFFESORS_COUNT,
  payload: count
});

export const getProffesorsCountAsync = () => {
  return dispatch => {
    const collectionsRef = firestore.collection('miembros');
    collectionsRef
    .where('type', '==', 'profesores')
    .onSnapshot(snapshot => {
      dispatch(setProffesorsCount(snapshot.docs ? snapshot.docs.length : 0));
    });
  }
};

export const setStudentsCount = (count) => ({
  type: Types.SET_STUDENTS_COUNT,
  payload: count
});

export const getStudentsCountAsync = () => {
  return dispatch => {
    const collectionsRef = firestore.collection('miembros');
    collectionsRef
    .where('type', '==', 'estudiantes')
    .onSnapshot(snapshot => {
      dispatch(setStudentsCount(snapshot.docs ? snapshot.docs.length : 0));
    });
  }
};