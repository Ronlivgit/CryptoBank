/* eslint-disable react/prop-types */

const CardDetails = ({isHistory,dataArray}) => {
    console.log("dataArray in card Details : " , dataArray)
    console.log("isHistory in card Details : " , isHistory)
    //! Subscription fields : amount , duration , name , nextPayment , startTimestamp
    //! History fields : amount , timestamp , description

  return (
        <div className='w-full h-full flex flex-row flex-wrap gap-4 justify-evenly '>
            {isHistory ? 
            <h1 className='text-2xl'>Card History</h1> 
            :
            <h1 className='text-2xl'>Card Subscriptions</h1>}
            {isHistory && dataArray.map((item, index) => (
            <div className='w-[90%] h-[10%] bg-slate-100 rounded-3xl p-2 flex flex-col flex-wrap justify-evenly 
            text-center text-black '
            key={index}>
                <h1>{item.description}</h1>
                <h2 className=''>{new Date(parseInt(item.timeStamp) * 1000).toLocaleDateString()}</h2>
                <h3 className='text-red-500'>{item.amount}</h3>
            </div>
            ))}

            {!isHistory && dataArray.map((item, index) => (
            <div className='w-full h-full rounded-3xl bg-blue-500' key={index}>
                <h1>{item.subscriptionName}</h1>
                <h2>{item.nextBillingDate}</h2>
                <h3>{item.amount}</h3>
            </div>
            ))}
        </div>
  )
}

export default CardDetails