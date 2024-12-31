import React, { useEffect, useState } from 'react';
import { useFetchTransactions } from '../firebase/useFetchTransactions';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const user = useSelector((state) => state.users.userData);
  const { transactions } = useFetchTransactions(user.id);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Amount',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (transactions.length > 0) {

      const categoryTotals = transactions.reduce((acc, transaction) => {
        const { tCategory, tAmount } = transaction;
        if (!acc[tCategory]) {
          acc[tCategory] = 0;
        }
        acc[tCategory] += tAmount;
        return acc;
      }, {});

      const labels = Object.keys(categoryTotals);
      const data = Object.values(categoryTotals);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Total Spends',
            data,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [transactions]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'TOTAL SPENDS FROM CATEGORY',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
