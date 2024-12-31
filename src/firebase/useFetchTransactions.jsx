import { useEffect, useState } from 'react';
import { db } from '../firebase/Firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const useFetchTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!userId) return;
    const q = query(collection(db, 'transactions'), where('uid', '==', userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const transactionsList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        transactionsList.push({
          id:doc.id,
          tid:data.aid,
          tDate: data.date,
          tMode: data.payment_mode,
          tCategory: data.expense_category,
          tAmount: data.amount,
        });
      });
      setTransactions(transactionsList);
    });
    return () => unsubscribe();
  }, [userId]);

  return { transactions };
};
