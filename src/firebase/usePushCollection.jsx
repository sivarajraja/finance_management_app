import { doc,collection, setDoc } from 'firebase/firestore';
import {db} from '../firebase/Firebase'
import { useState } from 'react';

export const usePushCollection = () => {
  
    const [firebaseError,setFirebaseError] = useState(null);

    const pushData = async ({fbCollection,fbData})=>{
        try{
            
            const docRef = doc(collection(db,fbCollection));
            await setDoc(docRef,fbData)
            console.log("added id:",docRef.id)

        }catch(error){
            setFirebaseError(error)
        }
    }

    return {pushData,firebaseError}
}
