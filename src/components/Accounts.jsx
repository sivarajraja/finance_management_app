import React, { useState, useEffect } from 'react';
import option_right from '../assets/option_right.png';
import option_down from '../assets/option_down.png';
import AddAccount from './AddAccount';
import { useFetchAccounts } from '../firebase/useFetchAccounts';
import { useDispatch, useSelector } from 'react-redux';
import {addIncome} from '../slices/transactionSlice'

export const Accounts = ({ name }) => {
  const [networthOpen, setNetworthOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const user = useSelector((state) => state.users.userData);
  const { accounts } = useFetchAccounts(user.id);

  const incomeTotal = useSelector((state) => state.transactions.totalIncome);
  const dispatch = useDispatch();

  const onClickHandler = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const totalIncome = accounts.reduce(
      (acc, group) => acc + Number(group.totalAmount),
      0
    );
    dispatch(addIncome(totalIncome));
  }, [accounts, dispatch]);

  return (
    <div className=" flex flex-col justify-center rounded-sm w-4/5 m-auto my-12">
      {/* Net worth */}
      <div>
        {name === 'ACCOUNT DETAILS' && (
          <div className="bg-gray-200 flex items-center ml-3">
            <button
              type="submit"
              onClick={onClickHandler}
              className="flex w-1/6 m-4 ml-6 justify-center items-center rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              New
            </button>
            <span className="mx-56">{name}</span>
          </div>
        )}

        {name === 'ACCOUNT DETAILS' && modalOpen && (
          <AddAccount setModalOpen={setModalOpen} />
        )}

        {name !== 'ACCOUNT DETAILS' && (
          <div className="flex items-center justify-between">
            <img
              onClick={() => setNetworthOpen(!networthOpen)}
              src={networthOpen ? option_down : option_right}
              className="p-3"
              alt="toggle"
            />

            <span>{name}</span>
            <div className="text-green-600 font-light ml-7">
              <span className="mr-2">{incomeTotal}</span>
              <span>INR</span>
            </div>
          </div>
        )}

        {networthOpen && (
          <div>
            {accounts.length === 0 ? (
              <div className="text-center text-gray-500 mt-4">
                <span>No accounts found.</span> <br/>
                {name !== 'ACCOUNT DETAILS' && <span className='text-red-300'>*Add Account in accounts tab</span>}
              </div>
            ) : (
              accounts.map((group) => (
                <div
                  key={group.type}
                  className="mt-2 border border-blue-gray-200 shadow-sm ml-3"
                >
                  {/* heading */}
                  <div className="flex justify-between bg-gray-100 p-2">
                    <span className="ml-3 font-bold">{group.type}</span>
                    <div className="text-green-600 font-light mr-2">
                      <span className="mr-2">{group.totalAmount}</span>
                      <span>INR</span>
                    </div>
                  </div>

                  {group.accounts.map((account) => (
                    <div key={account.id} className="flex justify-between p-2">
                      <span className="ml-3 text-blue-500">
                        {account.aName}
                      </span>
                      <div className="text-green-600 font-light mr-2">
                        <span className="mr-2">{account.aAmount}</span>
                        <span>INR</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
