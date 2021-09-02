import Types from './groups.types';
import {firestore} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: Types.FETCH_GROUPS_START
});

export const fetchCollectionsSuccess = (groups) => ({
  type: Types.FETCH_GROUPS_SUCCESS,
  payload: groups
});

export const fetchCollectionsFailure = (type, error) => ({
  type,
  payload: error
});

export const addGroupStart = () => ({
  type: Types.ADD_GROUPS_START
});

export const addGroupSuccess = (group) => ({
  type: Types.ADD_GROUPS_SUCCESS,
  payload: group
});

export const deleteGroupSuccess = (id) => ({
  type: Types.DELETE_GROUPS_SUCCESS,
  payload: id
});

export const editGroupSuccess = (group) => ({
  type: Types.EDIT_GROUPS_SUCCESS,
  payload: group
});

export const fetchGroupStudentsSuccess = (members) => ({
  type: Types.GET_GROUP_STUDENTS,
  payload: members
});

export const fetchGroupsStartAsync = () => {
  return dispatch => {
    dispatch(fetchCollectionsStart());
    const collectionsRef = firestore.collection('grupos');
    collectionsRef
    .orderBy('createdAt', 'asc')
    .onSnapshot(snapshot => {
      const groups = [];
      snapshot.docs.forEach(doc => {
        const group = {
          id: doc.id,
          ...doc.data()
        };
        groups.push(group)
      });
      dispatch(fetchCollectionsSuccess(groups));
    });
  }
};

export const addGroupsStartAsync = (group) => {
  return dispatch => {
    dispatch(addGroupStart());
    const collectionsRef = firestore.collection('grupos');
    collectionsRef.add(group)
    .then(() => {
      dispatch(addGroupSuccess(group));
    })
    .catch((error) => {
      dispatch(fetchCollectionsFailure(Types.ADD_GROUPS_FAILURE, error));
    });
  }
};

export const deleteGroupAsync = (id) => {
  return dispatch => {
    const collectionsRef = firestore.collection('grupos')
    collectionsRef.doc(id)
    .delete()
    .then(() => {
      dispatch(deleteGroupSuccess(id));
    });
  }
}

export const editGroupAsync = (group) => {
  return dispatch => {
    const collectionsRef = firestore.collection('grupos')
    collectionsRef.doc(group.id)
    .set({
      ...group,
      name: group.name
    })
    .then(() => {
      dispatch(editGroupSuccess(group));
    });
  }
}

export const fetchGroupStudentsStartAsync = (id) => { console.log('fetchGroupStudentsStartAsync', id);
  return dispatch => {
    dispatch(fetchCollectionsStart());
    let collectionsRef = firestore.collection('miembros');
    collectionsRef
    .orderBy('createdAt', 'asc')
    .where('type', '==', 'estudiantes')
    .where('groupId', '==', id)
    .onSnapshot(snapshot => {
      const members = [];
      snapshot.docs.forEach(doc => {
        const member = {
          id: doc.id,
          ...doc.data()
        };
        members.push(member)
      });
      dispatch(fetchGroupStudentsSuccess(members));
    });
  }
};