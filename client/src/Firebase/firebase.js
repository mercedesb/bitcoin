import firebase from 'firebase/app';
import 'firebase/auth';

var keysfb = require("./keysfb");

console.log("PROCESS:", process.env);

const config = {
  apiKey: "AIzaSyD6V2x_61X1qWxBuQJJh6VpgrocReek6Bk",
  authDomain: "bitcoin-2-e029a.firebaseapp.com",
  databaseURL: "https://bitcoin-2-e029a.firebaseio.com",
  projectId: "bitcoin-2-e029a",
  storageBucket: "bitcoin-2-e029a.appspot.com",
  messagingSenderId: "195092768796"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};