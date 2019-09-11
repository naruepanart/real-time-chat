import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCdUZpy7BjwdmxIDGx4jP6QH4bd1QPqRpU",
  authDomain: "hello-firebase-auth-fbc63.firebaseapp.com",
  databaseURL: "https://hello-firebase-auth-fbc63.firebaseio.com",
  projectId: "hello-firebase-auth-fbc63",
  storageBucket: "hello-firebase-auth-fbc63.appspot.com",
  messagingSenderId: "668010251307"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
