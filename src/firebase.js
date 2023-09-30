import { initializeApp } from "firebase/app";
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCK4DIv3I0VFTjyUvyRr8KJm6zOEDJwAuc",
  authDomain: "disney-plus-app-4e4d0.firebaseapp.com",
  projectId: "disney-plus-app-4e4d0",
  storageBucket: "disney-plus-app-4e4d0.appspot.com",
  messagingSenderId: "338466243352",
  appId: "1:338466243352:web:901bd179bdc0a1149b546d"
};

const app = initializeApp(firebaseConfig);

export default app;