
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  NextOrObserver,
  User,
  Unsubscribe
} from 'firebase/auth';
import { getFirebaseConfig } from './firebase-config';
import { getDatabase } from "firebase/database";
import { onValue, ref } from "firebase/database";
import { UserModel } from '../types';

const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);

export const signInUser = async (
  email: string, 
  password: string
) => {
  if (!email && !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
}

export const userStateListener = (callback:NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback)
}

export const SignOutUser = async () => await signOut(auth);
export const db = getDatabase(app);

export function listenForDatabaseChanges(userEmail: string, cb: Function): Unsubscribe {
    const userId = userEmail.split("@")[0] ?? ""
    const query = ref(db, "users" + "/" + userId);

    return onValue(query, (snapshot) => {
        const data = snapshot.val();

        if (snapshot.exists()) {
            const userObj = data as UserModel;
            cb(userObj)
        } else {
            cb(undefined)
        }
    });
}
