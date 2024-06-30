import { useState } from 'react';
import { getBnsInfo } from '../utils/generalFunctions';
import { useSelector } from 'react-redux';
import { baseOperatorUrl } from '../config/Api';

const TransferForm = () => {
  // State to manage form inputs
  const [amount, setAmount] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [isBns, setIsBns] = useState(false);
  const user = useSelector((state)=> state.user)

  // Function to handle form submission
  // TODO : Add Modal that will show the loading proccess and returns the information about the post.
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("HandleSubmit activated")
    console.log('Submitted:', { amount, toAddress , isBns });
    try {
      const finalAddress = isBns ? await getBnsInfo(toAddress,user) : toAddress
      console.log("finalAddress " , finalAddress)
        const response = await fetch(`${baseOperatorUrl}/transfer`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({toAddress : finalAddress , amount : amount}),
        });
        const data = await response.json();
        console.log("bns : " , data)
    } 
    catch (error) {
      console.error(error);
    }
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
