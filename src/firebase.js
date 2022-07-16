import Dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import {
  getDocs,
  getFirestore,
  where,
  collection,
  query,
} from "firebase/firestore";

Dotenv.config();
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MSG_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userRef = collection(db, "user");

export const findUserInfo = async (email) => {
  try {
    let userCollectionID = null;
    let userData = null;

    const q = query(userRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc);
      userCollectionID = doc.id;
      userData = doc.data();
    });
    console.log(userData);

    if (userCollectionID) {
      return userData;
    }

    return userData;
  } catch (e) {
    console.log(e);
  }
};
