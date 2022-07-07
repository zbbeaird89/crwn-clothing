import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  writeBatch,
  query
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqtjOgydA28tmAHDYPVBBDlKyTPcg5hjI",
  authDomain: "crwn-clothing-db-d6941.firebaseapp.com",
  projectId: "crwn-clothing-db-d6941",
  storageBucket: "crwn-clothing-db-d6941.appspot.com",
  messagingSenderId: "1055446927931",
  appId: "1:1055446927931:web:e37aa47184ebaae992ea1e"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();



export const addCollectionAndDocuments = async (collectionId, objectsToAdd) => {
  const collectRef = collection(db, collectionId);

  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectRef, object.title.toLowerCase())
    batch.set(docRef, object);
  });

  await batch.commit();
}



export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};



export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
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
        ...additionalInformation
      })
    } catch (error) {
      console.log("error creating the user", error.message)
    }

    return userDocRef
  }
}



export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}



export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}



export const signOutUser = async () => await signOut(auth);



export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
}
