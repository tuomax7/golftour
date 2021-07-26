import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBRpLTK5dSJOYfRaQYu6LSwHHYcwZbfKKU",
    authDomain: "golftour-a83ce.firebaseapp.com",
    databaseURL: "https://golftour-a83ce-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "golftour-a83ce",
    storageBucket: "golftour-a83ce.appspot.com",
    messagingSenderId: "1056326313282",
    appId: "1:1056326313282:web:8099d9bcd3206212b014db",
    measurementId: "G-TSSE2XD1BE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase