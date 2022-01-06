import fire from "firebase";
import 'firebase/firestore';
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyCJMQasadPVn0YE_97MebHg3MhxQnAEPGQ",
    authDomain: "myproject-35c9c.firebaseapp.com",
    projectId: "myproject-35c9c",
    storageBucket: "myproject-35c9c.appspot.com",
    messagingSenderId: "110791917640",
    appId: "1:110791917640:web:ebf1f9a0f6b9c9b1f1d87d",
    measurementId: "G-S5HYJ4GNLV"
  };

  if (!fire.apps.length) {
    fire.initializeApp(firebaseConfig)
  }
  export const auth = fire.auth()
  export default fire;
  