import { useState } from 'react';

const TransferForm = () => {
  // State to manage form inputs
  const [amount, setAmount] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [isBns, setIsBns] = useState(false);

  // Function to handle form submission
  // TODO : Add functionality of transfer to Both BNS and Address.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', { amount, toAddress , isBns });
  };

  return (
    <div className="flex flex-col h-full w-[100%] rounded-lg -mt-2">
      <div className='h-full p-4'>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full h-full">
          <div className="flex gap-4 ">
            <input
              type="text"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              placeholder={isBns ? "Enter recipient BNS" : "Enter recipient address"}
              className="flex-1 bg-slate-100 text-slate-900 rounded-xl p-2 w-[40%] md:w-auto"
              required
            />
            <select
              value={isBns}
              onChange={() => setIsBns(!isBns)}
              className="w-12 md:w-24 bg-slate-100 text-slate-900 rounded-xl p-2"
            >
              <option value={false}>Address</option>
              <option value={true}>BNS</option>
            </select>
          </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="bg-slate-100 text-slate-900 rounded-xl p-2"
              required
              min={0}
            />
          <button type="submit" className="bg-teal-400 text-slate-900 rounded-xl p-2 ">
            Transfer
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransferForm;
