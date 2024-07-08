import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDn7UNuZLFhAATgcb5lH7p4kyVEHwxKmts",
  authDomain: "drive-clone-6106f.firebaseapp.com",
  projectId: "drive-clone-6106f",
  storageBucket: "drive-clone-6106f.appspot.com",
  messagingSenderId: "389605343186",
  appId: "1:389605343186:web:ccf1733ebf2d2b0e04920b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { db, storage, auth, provider }



