import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from './Firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../slices/userSlice';
import { doc, setDoc } from 'firebase/firestore';

export const useSignup = () => {
  const [firebaseError, setFirebaseError] = useState(null);
  const dispatch = useDispatch();

  const signupFirebase = ({ fullName, email, password, address, phoneNumber, country }) => {
    setFirebaseError(null);

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user;

        const userData = {
          id: user.uid,
          name: fullName,
          email: email,
          address: address,
          phone: phoneNumber,
          country: country
        };

        // store user details to firestore
        const docRef = doc(db, 'users', user.uid);
        setDoc(docRef, userData);

        //add user to redux
        dispatch(addUser(userData));
      })
      .catch((error) => {
        const errorMessage = error.message;
        setFirebaseError(errorMessage);
      });
  };

  return { signupFirebase, firebaseError };
};
