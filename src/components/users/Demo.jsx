import React from 'react';
import vector from '../../assets/vector.png';
import { Link } from 'react-router-dom';

export const Demo = () => {
  return (
    <div className="border p-3 border-gray-500 w-4/5 flex items-center m-auto rounded-md shadow-xl">
      <div className="flex items-center">
        <div>
          <img src={vector} alt="user" className="w-32 h-auto ml-6" />
        </div>

        <div className="flex flex-col ml-6 p-6">
          <div>
            <h1 className="font-bold text-xl">
              Welcome! Expense Tracking Made Simple.
            </h1>
          </div>

          <h4 className="my-3 opacity-75">
            {' '}
            Simple expense tracker makes tracking expenses easy.You'll know at a
            glance what you're spending and how profitable you are
          </h4>

          <Link to="/login">
            <button className="bg-indigo-600 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
