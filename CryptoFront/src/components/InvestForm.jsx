/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TokenSelector from './TokenSelector';
import { executeInvestment, operateBalance } from '../utils/generalFunctions';

const InvestForm = ({ tokenSelection }) => {
  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log("selectedToken:", selectedToken);
  }, [selectedToken]);

  const handleMaxClick = () => {
    const maxTokens = ((user.balance * 0.995) / selectedToken?.current_price).toFixed(4);
    setBuyAmount(maxTokens);
    setSellAmount((maxTokens * selectedToken?.current_price).toFixed(4));
  };

  const handleBuyAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setBuyAmount(value);
    setSellAmount((value * selectedToken?.current_price).toFixed(4));
  };

  const handleSellAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setSellAmount(value);
    setBuyAmount((value / selectedToken?.current_price).toFixed(4));
  };

  const executePurchase = async (token,amount) => {
    try {
      const receipt = await executeInvestment(user,token,amount)
      console.log("total cost : " , sellAmount)
      if(receipt.msg){
        const asd = operateBalance(user,Math.round(-sellAmount))
        console.log("asd : " , asd);
        alert(receipt.msg)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-full w-full mx-auto p-2 md:p-4 bg-white rounded-lg shadow text-black">
      <h1 className="text-center mb-2 font-semibold">New Investment:</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Spend</label>
          <div className="relative">
            <input
              type="number"
              value={sellAmount}
              onChange={handleSellAmountChange}
              className="w-full p-2 pr-20 border border-gray-300 rounded"
              placeholder="0"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <span className="px-2 text-gray-500">USD</span>
              <button
                onClick={handleMaxClick}
                className="px-2 py-1 text-xs text-cyan-500 hover:text-cyan-600 border-l-2 border-gray-300"
              >
                Max
              </button>
            </div>
          </div>
          <div className="text-right text-xs text-gray-500 mt-1">
            Balance: {user.balance} <span className="text-pink-500"></span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Buy Tokens</label>
          <div className="flex flex-row w-full mt-3 p-1">
            <input
              type='number'
              min={0}
              step="0.0001"
              value={buyAmount}
              onChange={handleBuyAmountChange}
              className='w-[70%] rounded-lg mr-2 p-1 border border-gray-300'
              placeholder='Enter Tokens Amount'
            />
            <TokenSelector tokenSelection={tokenSelection} selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
          </div>
          {selectedToken?.current_price != null && (
            <div
              className="relative left-2 -top-1 text-left text-xs text-gray-500 cursor-pointer"
              onClick={handleMaxClick}
            >
              Max amount: {((user.balance * 0.995) / selectedToken?.current_price).toFixed(4)}
            </div>
          )}
        </div>
        <div>
          <button className='bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full w-3/6 ml-[25%]'
            onClick={()=>{executePurchase(selectedToken,buyAmount)}}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestForm;
