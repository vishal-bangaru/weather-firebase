import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"


// const firebaseConfig = {
//     apiKey: "AIzaSyD06wCPYBWD3NClJAw0jZWz5DioRktmq64",
//     authDomain: "weather-c3ae7.firebaseapp.com",
//     projectId: "weather-c3ae7",
//     storageBucket: "weather-c3ae7.appspot.com",
//     messagingSenderId: "801523336067",
//     appId: "1:801523336067:web:03c15b631511ad76e0acb6",
//     measurementId: "G-6B33XHWF05"
//   };
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
  };

  const app = initializeApp(firebaseConfig);
  export const db=getFirestore(app)
  export const auth=getAuth(app)