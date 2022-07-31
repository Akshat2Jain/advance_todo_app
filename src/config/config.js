import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBWNuC8Na4fDsYVNBMHbezPm3vKWtyffAM",
    authDomain: "auth-todo-359b9.firebaseapp.com",
    projectId: "auth-todo-359b9",
    storageBucket: "auth-todo-359b9.appspot.com",
    messagingSenderId: "220858622625",
    appId: "1:220858622625:web:189d660ca0cf79ac7b06e0"
  };

firebase.initializeApp(firebaseConfig);
const auth=firebase.auth();
const db=firebase.firestore();

export {auth,db}
