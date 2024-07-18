/* eslint-disable react/prop-types */

const StockTrack = ({topTokens}) => {

  return (
    <div className="flex flex-col h-full p-4 md:mt-[2.5vh] bg-red-600">
      <h2 className="text-3xl font-bold text-white text-center">Top {topTokens.length} Crypto Currencies</h2>
      <div className="flex flex-col justify-evenly gap-4 overflow-y-auto mt-[5%] h-[90%]">
        {topTokens?.map((stock, index) => (
          <div key={index} className="bg-slate-100 p-4 rounded-2xl flex flex-row gap-4">
            <img src={stock.image} className='h-12'/>
            <div>
                <p className=" font-bold">{stock.name}</p>
                <p className=" font-semibold">{stock.symbol.toUpperCase()}</p>
            </div>
            <div className='ml-auto text-right'>
                <p className="text-black">{stock.current_price}</p>
                <p className="text-black">{stock.price_change_percentage_24h > 0 ? 
                <span className='text-green-600'>+{stock.price_change_percentage_24h.toFixed(2)}%</span> :
                <span className='text-red-600'>{stock.price_change_percentage_24h.toFixed(2)}%</span>}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTrack;
