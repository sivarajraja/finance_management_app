import { useEffect, useState } from 'react';
import { db } from '../firebase/Firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const useFetchAccounts = (userId) => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (!userId) return;
    const q = query(collection(db, 'accounts'), where('uid', '==', userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const accountsList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        accountsList.push({
          id: doc.id,
          aName: data.Account_Name,
          aNumber: data.Account_Number,
          aType: data.Account_Type,
          aAmount: data.Amount,
        });
      });

      // this will conver the array into object according to account types
      const groupedAccounts = accountsList.reduce((acc, account) => {
        if (!acc[account.aType]) {
          acc[account.aType] = { accounts: [], totalAmount: 0 };
        }
        acc[account.aType].accounts.push(account);
        acc[account.aType].totalAmount += Number(account.aAmount);
        return acc;
      }, {});
      console.log(groupedAccounts);

      // this will change the object to array of objects
      const groupedAccountList = Object.keys(groupedAccounts).map((key) => ({
        type: key,
        accounts: groupedAccounts[key].accounts,
        totalAmount: groupedAccounts[key].totalAmount,
      }));

      setAccounts(groupedAccountList);
    });
    return () => unsubscribe();
  }, [userId]);

  return { accounts };
};
