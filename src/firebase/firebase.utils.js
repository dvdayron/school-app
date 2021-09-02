import firebase from 'firebase/app';
import 'firebase/firestore';

/* Firebase project configuration*/
const config = {
  apiKey: "AIzaSyCcRNeJZlvvIvfpm64mde80zdVjbWAIK-A",
  authDomain: "school-app-73a17.firebaseapp.com",
  projectId: "school-app-73a17",
  storageBucket: "school-app-73a17.appspot.com",
  messagingSenderId: "188142145592",
  appId: "1:188142145592:web:bd9597ade3ba2db60756cd"
};

/* Check for existing firebase app before initialize*/
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
  firebase.app();
}

/* Firestore db*/
export const firestore = firebase.firestore();

/* Firebase object*/
export default firebase;