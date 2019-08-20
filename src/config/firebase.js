import firebase from 'firebase/app'
import 'firebase/auth'


var firebaseConfig = {
    apiKey: "AIzaSyA78cB-3dn87-oKaP75rqbOGkyPLearc1g",
    authDomain: "quiz-app-12rc.firebaseapp.com",
    databaseURL: "https://quiz-app-12rc.firebaseio.com",
    projectId: "quiz-app-12rc",
    storageBucket: "",
    messagingSenderId: "1004237954213",
    appId: "1:1004237954213:web:420d53dc8f06fbd3"
  };

  // Initialize Firebase
 const firebaseApp= firebase.initializeApp(firebaseConfig);



 const provider = new firebase.auth.FacebookAuthProvider();
export{
  firebaseApp,provider
}