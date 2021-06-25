import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeuJU3321uWor0J_WtdzDuFrC9-hvtDQk",
  authDomain: "email-scheduler-5e3d8.firebaseapp.com",
  projectId: "email-scheduler-5e3d8",
  storageBucket: "email-scheduler-5e3d8.appspot.com",
  messagingSenderId: "420606347385",
  appId: "1:420606347385:web:786ba773e107d38ba1aca8",
  measurementId: "G-TZ17LRNXLR",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
