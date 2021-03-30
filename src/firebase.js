import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyC_HTdH-NFs73tTaqZgtoF8sBXNLq15eHk",
    authDomain: "netflix-clone-b4654.firebaseapp.com",
    projectId: "netflix-clone-b4654",
    storageBucket: "netflix-clone-b4654.appspot.com",
    messagingSenderId: "656569412743",
    appId: "1:656569412743:web:440f009f2759a4728a1c22"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth };
  export default db;