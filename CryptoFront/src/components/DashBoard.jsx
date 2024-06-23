/* eslint-disable no-unused-vars */
import React from 'react'

const BankDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
              <span className="font-bold text-xl">LINES BANK</span>
            </div>
            <nav className="hidden md:flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Transactions</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Payments</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Deposits</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Credits</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Archive</a>
            </nav>
            <div className="flex items-center space-x-2">
              <span>Jack Davidson</span>
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex">
          {/* Friends List (Left Sidebar) */}
          <div className="w-1/4 p-4 border-r border-gray-200">
            <h2 className="font-bold text-lg mb-4">Friends</h2>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <span>John Doe</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                <span>Jane Smith</span>
              </li>
              {/* Add more friends as needed */}
            </ul>
          </div>

          {/* Balance and Main Content (Center) */}
          <div className="w-1/2 p-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Current Balance</h2>
              <p className="text-4xl font-bold text-green-600">$15,092.45</p>
            </div>

            {/* Additional content can be added here */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-xl mb-6">
              <h3 className="text-xl font-bold mb-2">Debit card under new terms and conditions</h3>
              <ul className="space-y-1">
                <li>Fast calculation</li>
                <li>Payments in 1 day</li>
                <li>24-hour support</li>
              </ul>
              <button className="mt-4 bg-white text-indigo-600 px-4 py-2 rounded-full font-bold">See more</button>
            </div>

            {/* Transactions Chart (placeholder) */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-bold mb-2">Transactions in January</h3>
              <div className="h-40 bg-gray-200 rounded-lg"></div> {/* Placeholder for chart */}
            </div>
          </div>

          {/* Quick Actions (Right Sidebar) */}
          <div className="w-1/4 p-4 border-l border-gray-200">
            <h2 className="font-bold text-lg mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Transfer Money
              </button>
              <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300">
                Pay Bills
              </button>
              <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition duration-300">
                Mobile Top-up
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BankDashboard;