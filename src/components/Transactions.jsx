import React, { useState } from 'react';
import { TransactionTotal } from './TransactionTotal';
import { TransactionsHistory } from './TransactionsHistory';
import { AddExpenseModal } from './AddExpenseModal';

export const Transactions = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const onClickHandler = () => {
    setModalOpen(true);
  };

  return (
    <div className=" flex flex-col justify-center border border-blue-gray-100 shadow-md rounded-sm w-4/5 m-auto my-12 p-8">
      <div className="bg-gray-200 p-4 rounded-t-md">
        <button
          type="submit"
          onClick={onClickHandler}
          className="flex justify-center bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          ADD NEW TRANSACTION
        </button>
      </div>

      {modalOpen && <AddExpenseModal setModalOpen={setModalOpen} />}

      <div className="mt-6">
        <TransactionsHistory />
      </div>

      <div className="mt-6">
        <TransactionTotal />
      </div>
    </div>
  );
};
