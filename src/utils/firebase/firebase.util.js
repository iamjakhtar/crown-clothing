import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDceRmndxxBTozP_Vx6KCpsGmLmjvt2sBE",
  authDomain: "crwn-clothing-db-77210.firebaseapp.com",
  projectId: "crwn-clothing-db-77210",
  storageBucket: "crwn-clothing-db-77210.appspot.com",
  messagingSenderId: "198549263333",
  appId: "1:198549263333:web:193f2199e462ee3809950c",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();
export const createUserDocumentFromAuth = async (
  userAuth,
  additionInfo = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionInfo,
      });
    } catch (error) {
      console.log(`Error created user document`, error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};
