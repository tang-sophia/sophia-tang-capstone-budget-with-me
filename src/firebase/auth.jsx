import { auth } from "./firebase";
import { createUserWithEmailAndAPassword } from "firebase/auth";

export const doCreateUserWithEmailAndAPassword = async (email, paswsword) => {
  return createUserWithEmailAndAPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {};
