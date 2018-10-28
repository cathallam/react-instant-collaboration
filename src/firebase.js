// Setting up firebase database

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// File retrieved from Firebase project
var config = {
  apiKey: "AIzaSyAnlBT2iw5pVykpW8SfOZ5JOTIh1UA672A",
  authDomain: "instant-collaboration.firebaseapp.com",
  databaseURL: "https://instant-collaboration.firebaseio.com",
  projectId: "instant-collaboration",
  storageBucket: "instant-collaboration.appspot.com",
  messagingSenderId: "913441340393"
};
firebase.initializeApp(config);

export default firebase;