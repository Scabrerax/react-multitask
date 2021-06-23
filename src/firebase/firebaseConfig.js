import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBSwhAhBuhg6dZ5g6YJ7iK0-a40Vq6V-Xg",
    authDomain: "react-apps-9a047.firebaseapp.com",
    projectId: "react-apps-9a047",
    storageBucket: "react-apps-9a047.appspot.com",
    messagingSenderId: "390529761180",
    appId: "1:390529761180:web:6476defba1c5dfb9a9d259"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()


export {
    db,
    googleAuthProvider,
    firebase
}