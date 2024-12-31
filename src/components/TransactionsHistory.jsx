import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchTransactions } from '../firebase/useFetchTransactions';
import { PaymentImage } from './PaymentImage';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import { addExpense } from '../slices/transactionSlice';
import { useFetchAccounts } from '../firebase/useFetchAccounts';

export const TransactionsHistory = ({ limit }) => {
  const user = useSelector((state) => state.users.userData);
  const { transactions } = useFetchTransactions(user.id);
  const { accounts } = useFetchAccounts(user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    const totalExpense = transactions.reduce(
      (acc, transaction) => acc + Number(transaction.tAmount),
      0
    );
    dispatch(addExpense(totalExpense));
  }, [transactions, dispatch]);

  if (!transactions.length) {
    return (
      <div className=" rounded-md flex justify-center my-5  w-full">
        No transactions found
      </div>
    );
  }

  const sortedTransactions = transactions.sort(
    (a, b) => b.tDate.seconds - a.tDate.seconds
  );

  const transactionsToDisplay = limit
    ? sortedTransactions.slice(0, limit)
    : sortedTransactions;

  return (
    <div className=" rounded-md  w-full">
      <ul className="border-collapse">
        {transactionsToDisplay.map((transaction, index) => {
          const account = accounts.find(
            (account) => account.id === transaction.tid
          );
          return (
            <li
              key={index}
              className="flex items-center justify-between py-4 px-2 border-b border-dotted border-gray-500"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-600 ml-2 mr-4">
                  {new Date(
                    transaction.tDate.seconds * 1000
                  ).toLocaleDateString()}
                </span>
                <PaymentImage mode={transaction.tMode} />
                {account ? (
                  <Tooltip
                    title={`CARD NAME: ${account.aName} CARD NUMBER: ${account.aNumber} CARD TYPE: ${account.aType}`}
                    position="top"
                    trigger="mouseenter"
                    className="text-gray-900 ml-2"
                  >
                    <span>{transaction.tMode}</span>
                  </Tooltip>
                ):<span className="text-gray-900 ml-2">{transaction.tMode}</span>}
                <span className="bg-gray-400 rounded-sm px-3 text-xs ml-3 text-gray-800 font-extralight">
                  {transaction.tCategory}
                </span>{' '}
              </div>

              <div className="text-green-600 font-light mr-2">
                <span className="mr-2">{transaction.tAmount}</span>
                <span>INR</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
