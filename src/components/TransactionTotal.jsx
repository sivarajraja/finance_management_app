import React from 'react';
import { useSelector } from 'react-redux';

export const TransactionTotal = () => {
  const totalIncome = useSelector((state) => state.transactions.totalIncome);
  const totalExpense = useSelector((state) => state.transactions.totalExpense);

  const balance = (totalIncome - totalExpense);
  const balanceClass = balance >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="my-3">
      <ul>
        <li className="flex justify-end ">
          <div className="flex justify-between p-2 m-2 w-2/5 border-b border-b-gray-200">
            <span className="font-extralight">Total Income</span>
            <div className="text-green-600 font-light flex mr-2">
              <span className="mr-2">{totalIncome}</span>
              <span>INR</span>
            </div>
          </div>
        </li>

        <li className="flex justify-end ">
          <div className="flex justify-between p-2 m-2 w-2/5 border-b border-b-gray-200">
            <span className="font-extralight">Total Expense</span>
            <div className="text-green-600 font-light flex mr-2">
              <span className="mr-2">{totalExpense}</span>
              <span>INR</span>
            </div>
          </div>
        </li>

        <li className="flex justify-end ">
          <div className="flex justify-between p-2 m-2 w-2/5">
            <span className="font-extralight">Balance</span>
            <div className= {`text-green-600 font-light flex mr-2 ${balanceClass}`}>
              <span className={`mr-2`}>{balance}</span>
              <span>INR</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
