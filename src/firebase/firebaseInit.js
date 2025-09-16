// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyazAlSUBsGN217AE_W8IvUiNdY7nRNQg",
  authDomain: "tree-planet-d253c.firebaseapp.com",
  projectId: "tree-planet-d253c",
  storageBucket: "tree-planet-d253c.firebasestorage.app",
  messagingSenderId: "167305861289",
  appId: "1:167305861289:web:a59b705fa4dfeb314871b8",
  measurementId: "G-K45M9P8VNZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//  const analytics = getAnalytics(app);
export const auth = getAuth(app);