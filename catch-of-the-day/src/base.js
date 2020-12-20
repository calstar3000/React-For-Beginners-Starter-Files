import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCSANikC5qdt3MuJC66bkUGOoxn1SQyX8c",
  authDomain: "catch-of-the-day-calum-o-neil.firebaseapp.com",
  databaseURL:
    "https://catch-of-the-day-calum-o-neil-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
