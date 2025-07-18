// Substitui os valores abaixo pelo teu projecto Firebase
const firebaseConfig = {
  apiKey: "TUA_API_KEY",
  authDomain: "TUA_AUTH_DOMAIN",
  databaseURL: "TUA_DATABASE_URL",
  projectId: "TUA_PROJECT_ID",
  storageBucket: "TUA_STORAGE_BUCKET",
  messagingSenderId: "TUA_SENDER_ID",
  appId: "TUA_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();
