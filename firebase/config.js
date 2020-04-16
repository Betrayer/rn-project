import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDC_B81zb6NLBQ5myQyjcPnTxXcDqlkYyk",
  authDomain: "initialproject-b512b.firebaseapp.com",
  databaseURL: "https://initialproject-b512b.firebaseio.com",
  projectId: "initialproject-b512b",
  storageBucket: "initialproject-b512b.appspot.com",
  messagingSenderId: "517819142687",
  appId: "1:517819142687:web:d6a2925449046c081a7b2a",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, firestore, storage };
