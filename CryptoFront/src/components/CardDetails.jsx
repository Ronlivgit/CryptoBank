/* eslint-disable react/prop-types */

const CardDetails = ({isHistory,dataArray}) => {
    //! Subscription fields : amount , duration , name , nextPayment , startTimestamp
    //! History fields : amount , timestamp , description
  return (
    <div className="space-y-2 h-[80%] overflow-y-auto">
      {dataArray.map((item, index) => (
        <div key={index} className="bg-gray-800 bg-opacity-50 rounded-lg p-3 text-sm">
          {isHistory ? (
            <>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-400">{new Date(parseInt(item.timeStamp)*1000).toLocaleDateString()}</span>
                <span className="font-bold text-red-400">
                  {parseFloat(item.amount).toFixed(2)} $
                </span>
              </div>
              <div className="text-white truncate">{item.description}</div>
            </>
          ) : (
            <>
              <div className="flex justify-between text-gray-400 text-xs mb-1">
                <span>Started at : {new Date(parseInt(item.startTimestamp)*1000).toLocaleDateString()}</span>
                <span>Next payment : {new Date(parseInt(item.nextPayment)*1000).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-medium truncate">{item.name}</span>
                <span className="text-red-400 font-bold">{parseFloat(item.amount).toFixed(2)} $</span>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default CardDetails