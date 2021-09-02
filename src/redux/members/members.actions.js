import Types from './members.types';
import {firestore} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: Types.FETCH_MEMBERS_START
});

export const fetchCollectionsSuccess = (groups) => ({
  type: Types.FETCH_MEMBERS_SUCCESS,
  payload: groups
});

export const fetchCollectionsFailure = (type, error) => ({
  type,
  payload: error
});

export const addMemberStart = () => ({
  type: Types.ADD_MEMBERS_START
});

export const addMemberSuccess = (member) => ({
  type: Types.ADD_MEMBERS_SUCCESS,
  payload: member
});

export const deleteMemberSuccess = (id) => ({
  type: Types.DELETE_MEMBERS_SUCCESS,
  payload: id
});

export const editMemberSuccess = (member) => ({
  type: Types.EDIT_MEMBERS_SUCCESS,
  payload: member
});

export const fetchMembersStartAsync = (type) => {
  return dispatch => {
    dispatch(fetchCollectionsStart());
    let collectionsRef = firestore.collection('miembros');
    collectionsRef
    .orderBy('createdAt', 'asc');
    collectionsRef = type !== null ? collectionsRef.where('type', '==', type) : collectionsRef;
    collectionsRef.onSnapshot(snapshot => {
      const groups = [];
      snapshot.docs.forEach(doc => {
        const member = {
          id: doc.id,
          ...doc.data()
        };
        groups.push(member)
      });
      dispatch(fetchCollectionsSuccess(groups));
    });
  }
};

export const addMembersStartAsync = (member) => {
  return dispatch => {
    dispatch(addMemberStart());
    const collectionsRef = firestore.collection('miembros');
    collectionsRef.add(member)
    .then(() => {
      dispatch(addMemberSuccess(member));
    })
    .catch((error) => {
      dispatch(fetchCollectionsFailure(Types.ADD_MEMBERS_FAILURE, error));
    });
  }
};

export const deleteMemberAsync = (id) => {
  return dispatch => {
    const collectionsRef = firestore.collection('miembros')
    collectionsRef.doc(id)
    .delete()
    .then(() => {
      dispatch(deleteMemberSuccess(id));
    });
  }
}

export const editMemberAsync = (member) => {
  return dispatch => {
    const collectionsRef = firestore.collection('miembros')
    collectionsRef.doc(member.id)
    .set({
      ...member,
      name: member.name
    })
    .then(() => {
      dispatch(editMemberSuccess(member));
    });
  }
}