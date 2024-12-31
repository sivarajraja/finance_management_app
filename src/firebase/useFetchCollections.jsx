import { useEffect } from "react"
import { useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import {db} from './Firebase'

export const useFetchCollections = ({fbCollection,fbDocument}) => {
  
    const [data,setData] = useState(null)

    useEffect(()=>{

        let documentRef = doc(db,fbCollection,fbDocument)
        const unsub = onSnapshot(documentRef,(doc)=>{
            setData(doc.data());
        })

        return ()=> unsub()

    },[fbCollection,fbDocument])

    return {data}
}
