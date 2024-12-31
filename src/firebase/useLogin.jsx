import React, { useState } from 'react';
import { auth } from './Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../slices/userSlice';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './Firebase';

export const useLogin = () => {
  const [firebaseError, setFirebaseError] = useState(null);

  const dispatch = useDispatch();

  // get user name from firestore
  const fetchUserName = async (uid) => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().name;
    } else {
      throw new Error('No such document!');
    }
  };

  const loginFirebase = ({ email, password }) => {
    setFirebaseError(null);

    signInWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const user = response.user;
        try {
          const name = await fetchUserName(user.uid);
          const userData = { id: user.uid, name: name, email: email };
          dispatch(addUser(userData));
        } catch (error) {
          const errorMessage = error.message;
          setFirebaseError(errorMessage);
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        setFirebaseError(errorMessage);
      });
  };
  return { loginFirebase, firebaseError };
};