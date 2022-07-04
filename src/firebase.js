import { initializeApp } from "firebase/app";
import { getFirestore, query, where } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";

const firebaseConfig = {
  // ...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userRef = collection(db, "user");

export const findUserInfo = (email) => {
  const q = query(userRef, where("email", "in", email));
};
