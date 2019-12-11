import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBhLplj30ebDN3K_6HHZKdrHXEv85o9oqU',
  authDomain: 'fat-cat-8714c.firebaseapp.com',
  databaseURL: 'https://fat-cat-8714c.firebaseio.com',
  projectId: 'fat-cat-8714c',
  storageBucket: 'fat-cat-8714c.appspot.com',
  messagingSenderId: '754272638103'
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
