import React from 'react';

export const Alerts = () => {
  return (
    <div className=" flex flex-col justify-center border border-blue-gray-100 shadow-md rounded-sm w-4/5 m-auto my-12">
      <div className="bg-gray-200 p-4">
        <button
          type="submit"
          className="flex w-1/4 justify-center cursor-default bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
            />
          </svg>
          ALERTS
        </button>
      </div>
      <div className="flex justify-center m-5">
        <span>No Alerts Found</span>
      </div>
    </div>
  );
};
