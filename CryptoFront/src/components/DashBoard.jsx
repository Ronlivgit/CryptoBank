/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const BankDashBoard = ({ transactions, currentBalance }) => {
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  const { labels, balances, operations } = transactions.reverse().reduce((acc, transaction) => {
    const date = new Date(parseInt(transaction.timestamp) * 1000);
    const amount = parseInt(transaction.amount);
    acc.labels.push(date);
    acc.runningBalance += amount;
    acc.balances.push(acc.runningBalance);

    // Categorize transactions for pie chart
    if (transaction.operationType === "changeBalance") {
      amount > 0 ? acc.operations.deposit += amount : acc.operations.withdraw -= amount;
    } else if (transaction.operationType === "transferBalance") {
      amount > 0 ? acc.operations.received += amount : acc.operations.sent -= amount;
    }
    return acc;
  }, { 
    labels: [], 
    balances: [], 
    runningBalance: 0, 
    operations: { deposit: 0, withdraw: 0, received: 0, sent: 0 }
  });

  const lineData = {
    labels,
    datasets: [{
      label: 'Balance',
      data: balances,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const pieData = {
    labels: ['Deposit', 'Withdraw', 'Received', 'Sent'],
    datasets: [{
      data: [operations.deposit, operations.withdraw, operations.received, operations.sent],
      backgroundColor: [
        'rgba(75, 192, 192, 0.8)', // Deposit - green
        'rgba(255, 99, 132, 0.8)', // Withdraw - red
        'rgba(54, 162, 235, 0.8)', // Received - blue
        'rgba(255, 206, 86, 0.8)'  // Sent - orange
      ]
    }]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Financial Operations Breakdown'
      }
    }
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day', // Adjust this based on your data
          displayFormats: {
            day: `d.MM`
          }
        },
        title: {
          display: false,
          text: 'Date'
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          source: 'auto'
        },
        min: labels.length > 0 ? labels[0] : undefined,
        max: labels.length > 0 ? labels[labels.length - 1] : undefined,
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Balance'
        }
      }
    }
  };



  return (
    <div className="container h-full mx-auto px-4 py-8 text-white">
      <h1 className="text-xl md:text-4xl font-bold mb-8">Welcome back User B Demo</h1>
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold">Current Balance : ${currentBalance}</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:ml-[15%]">
        {/* Line Chart */}
        <div className="lg:col-span-4 bg-white/90 p-4 rounded-lg shadow-lg ">
          <div className="h-40 md:h-64">
            <Line ref={lineChartRef} data={lineData} options={lineOptions} />
          </div>
        </div>
        {/* Combined Pie Chart */}
        <div className="bg-white/90 p-4 rounded-lg shadow-lg block col-span-2">
          <div className="h-64">
            <Pie ref={pieChartRef} data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDashBoard;