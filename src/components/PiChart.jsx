import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import {useFetchTransactions} from '../firebase/useFetchTransactions'

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Pi Chart',
    },
  },
};

const PiChart = () => {
  const user = useSelector((state) => state.users.userData);
  const { transactions } = useFetchTransactions(user.id);

  const categories = [
    'Groceries',
    'Restaurant',
    'Movies',
    'Utilities',
    'Shopping',
    'Petrol',
    'Electricity',
    'Rent',
    'Others',
  ];

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Total Amount Spends',
        data: categories.map((category) =>
          transactions
            .filter((transaction) => transaction.tCategory === category)
            .reduce((sum, transaction) => sum + transaction.tAmount, 0)
        ),
        backgroundColor: [
          'rgba(173, 216, 230, 1)',
          'rgba(255, 182, 193, 1)',
          'rgba(188, 109, 95, 0.8)',
          'rgba(144, 238, 144, 1)',
          'rgba(221, 160, 221, 1)',
          'rgba(255, 228, 181, 1)',
          'rgba(175, 238, 238, 1)',
          'rgba(176, 196, 222, 1)',
          'rgba(192, 192, 192, 1)',
        ],
        borderColor: [
          'rgba(135, 206, 235, 1)',
          'rgba(255, 105, 180, 1)',
          'rgba(170, 96, 83, 0.8)',
          'rgba(152, 251, 152, 1)',
          'rgba(218, 112, 214, 1)',
          'rgba(255, 218, 185, 1)',
          'rgba(127, 255, 212, 1)',
          'rgba(119, 136, 153, 1)',
          'rgba(169, 169, 169, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Pie options={options} data={data} />
    </div>
  );
};

export default PiChart;
