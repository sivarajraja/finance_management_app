import React, { useState } from 'react';
import PiChart from './PiChart';
import { useSelector } from 'react-redux';
import BarChart from './BarChart';

export const Reports = () => {
  const [lineChart, setLineChart] = useState(true);
  const [piChart, setPiChart] = useState(false);

  const totalIncome = useSelector((state)=>state.transactions.totalIncome)
  const totalExpense = useSelector((state)=>state.transactions.totalExpense)

  const lineChartHandler = () => {
    setLineChart(true);
    setPiChart(false);
  };

  const piChartHandler = () => {
    setPiChart(true);
    setLineChart(false);
  };

  return (
    <div className="m-auto flex flex-col justify-center border border-blue-gray-100 shadow-lg rounded-sm w-4/5 my-5 p-8">
      <div className="flex justify-start bg-gray-200 rounded-md w-full border-b border-gray-300">
        <span className="m-4 ml-6 rounded-sm bg-white px-3 py-1 text-sm font-thin text-gray-700 shadow-sm">
          Income & Expense
        </span>
      </div>

      <div className="border-b border-gray-300 mt-4">
        <div className="flex justify-start gap-9 p-5 ml-2">
          <div className="flex flex-col justify-center items-center">
            <span className="text-xl text-green-800 font-medium">{totalIncome} INR</span>
            <span className="font-semibold text-gray-900 text-sm">
              TOTAL INCOME
            </span>
          </div>

          <div className="flex flex-col justify-center items-center">
            <span className="text-xl text-green-800 font-medium">{totalExpense} INR</span>
            <span className="font-semibold text-gray-900 text-sm">
              TOTAL EXPENSE
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-5 m-6">
        <button
          type="submit"
          onClick={lineChartHandler}
          className={`flex w-full justify-center rounded-md ${lineChart ? 'bg-gray-200' : 'bg-gray-800'} px-3 py-1.5 text-sm font-semibold ${lineChart ? 'text-gray-800' : 'text-white'} shadow-sm ${lineChart ? 'cursor-not-allowed' : 'hover:bg-gray-600'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500`}
        >
          Bar Chart
        </button>

        <button
          type="submit"
          onClick={piChartHandler}
          className={`flex w-full justify-center rounded-md ${piChart ? 'bg-gray-200' : 'bg-gray-800'} px-3 py-1.5 text-sm font-semibold ${piChart ? 'text-gray-800' : 'text-white'} shadow-sm ${piChart ? 'cursor-not-allowed' : 'hover:bg-gray-600'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500`}
        >
          Pie Chart
        </button>
      </div>

      {lineChart && (
        <div className="border-b border-gray-300">
          <div className="p-3">
            <BarChart/>
          </div>
        </div>
      )}

      {piChart && (
        <div className="border-b border-gray-300">
          <div className="m-auto p-5 w-4/6">
            <PiChart />
          </div>
        </div>
      )}
    </div>
  );
};
