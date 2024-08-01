// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiV566dxWKNfP8ax-qxOThAd5IDRsZ5uA",
  authDomain: "blog-2ed7f.firebaseapp.com",
  projectId: "blog-2ed7f",
  storageBucket: "blog-2ed7f.appspot.com",
  messagingSenderId: "438441951234",
  appId: "1:438441951234:web:9be1918fee8dcc04e2671b",
  measurementId: "G-19XCYH6JSV",

  // apiKey: "AIzaSyAjP9YVM0U2HpjayfD0tuLCCYV5peYvTFE",
  // authDomain: "blogproject-6c9d5.firebaseapp.com",
  // projectId: "blogproject-6c9d5",
  // storageBucket: "blogproject-6c9d5.appspot.com",
  // messagingSenderId: "521131057054",
  // appId: "1:521131057054:web:f3d578c427fb63133f008f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

// // firebaseConfig.js
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

// const app = initializeApp(firebaseConfig);
// export default app;
