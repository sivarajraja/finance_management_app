import React, { useState } from 'react';
import { Accounts } from './Accounts';
import { AddExpense } from './AddExpense';
import option_right from '../assets/option_right.png';
import option_down from '../assets/option_down.png';
import { TransactionsHistory } from './TransactionsHistory';
import { useSelector } from 'react-redux';

export const Dashboard = () => {
  const [recentOpen, setRecentOpen] = useState(true);
  const userData = useSelector((state) => state.users.userData);
  console.log(userData);

  return (
    <div className=" flex border border-blue-gray-100 shadow-md rounded-sm w-4/5 mx-auto my-12">
      <div className="w-2/5">
        <Accounts name={'NET WORTH'} />
      </div>
      <div className="flex flex-col justify-center w-1/2 mx-auto">
        <div className="mt-11">
          <AddExpense />
        </div>

        <div className="flex flex-col rounded-sm p-3 my-11">
          <div className="flex items-center">
            <img
              src={recentOpen ? option_down : option_right}
              onClick={() => setRecentOpen(!recentOpen)}
              alt="toggle"
            />
            <span className="ml-3">RECENT TRANSACTIONS</span>
          </div>
          <span className="font-thin text-sm ml-5 mt-3 text-red-400">
            * We show only the Recent 4 Transactions. See full transactions on the Transactions page.
          </span>
          {recentOpen && (
            <div className="border-2 mt-5 rounded-md border-gray-400">
              <TransactionsHistory limit={4} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
