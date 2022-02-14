import firebase from "firebase/app"
import "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyCtH7efXoTlHGGvhsofGtw1gdiwzcXuJnA",
    authDomain: "talkactive-448d2.firebaseapp.com",
    projectId: "talkactive-448d2",
    storageBucket: "talkactive-448d2.appspot.com",
    messagingSenderId: "94611548165",
    appId: "1:94611548165:web:b7ceb85f64e0a2b9cf546c"
  };

export const auth = firebase.initializeApp(firebaseConfig).auth()

