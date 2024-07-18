import Transactions from "../../components/Transactions";
import TransferForm from "../../components/TransferForm";
import { useMemo, useState } from "react";
import RegisterBNS from "../../components/RegisterBNS";
import BnsCard from "../../components/BnsCard";
import CardDetails from "../../components/CardDetails";
import Navbar from "../../components/Navbar";
import { useLoaderData } from "react-router-dom";

const UserDashboard = () => {
  // Register BNS , Create Card ,
  const [txPagination, setTxPagination] = useState(1);
  const loaderData = useLoaderData()
  const [isHistory,setIsHistory] = useState(true)
  const { txArray, cardStatus, cardHistory, cardSubs , user, error } = loaderData || {}
  const balanceUsedInPercentage = (parseFloat(cardStatus?.usedBalance / cardStatus?.creditLimit) * 100);
  
  if(error){
    console.error("Error on loaderData : " , error)
  }

  const currentTxArray = useMemo(()=>{
    return txArray?.slice((txPagination - 1) * 10, (txPagination - 1) * 10 + 10)
  },[txArray,txPagination])

  const paginationForward = () => {
    if ((txPagination - 1) * 10 + 10 < txArray?.length) {
      setTxPagination(txPagination + 1);
    }
  };

  const paginationBack = () => {
    if (txPagination > 1) {
      setTxPagination(txPagination - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col bg-stone-800/70 w-[100vw] h-auto md:h-[97.3vh] overflow-y-auto md:overflow-y-hidden overflow-x-hidden -mt-[2vh]">
        <div className="bg-gradient-to-tr from-zinc-700 via-slate-700 to-stone-800/90 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
              <div className="col-span-2 bg-white bg-opacity-15 backdrop-blur-lg rounded-xl p-6 text-white h-[38vh] md:h-[30vh]">
                <h1 className="text-center text-2xl -mt-4 mb-4 font-semibold">
                  Account Balance :
                  {user.balance > 0 ? (
                    <span className="text-green-500"> {user.balance}$ </span>
                  ) : (
                    <span className="text-red-500"> -{user.balance}$ </span>
                  )}
                </h1>
                <div className="flex flex-row flex-wrap md:h-[23vh] justify-evenly mb-4 gap-4 w-[49%] border rounded-3xl border-teal-400/85 ">
                  <h2 className="text-xl font-semibold mb-4 text-center mt-6 border-b-2 border-teal-400">
                    Transfer Funds
                  </h2>
                  <TransferForm />
                </div>
                <div
                  className="flex flex-row flex-wrap justify-evenly rounded-3xl border border-teal-400/85
                    relative -top-[28.3vh] size-auto md:-top-[24.3vh] left-[51%] w-[49%] md:h-[23vh] "
                >
                  {user.user.bnsName === null ? (
                    <>
                      <h2 className="text-xl font-semibold mb-4 text-center mt-6 border-b-2 border-teal-400">
                        BNS Registry :{" "}
                      </h2>
                      <RegisterBNS />
                    </>
                  ) : (
                    <>
                      <BnsCard />
                    </>
                  )}
                </div>
              </div>

              <div className="bg-white bg-opacity-15 backdrop-blur-lg rounded-xl p-6 text-white">
                <div className="size-auto w-full rounded-full flex flex-row flex-wrap justify-evenly">
                  <img
                    src="https://shorturl.at/rSz8Z"
                    height={50}
                    width={200}
                    className="rounded-2xl size-[65%]"
                  />
                  <div className="w-full flex flex-wrap justify-center gap-2">
                    {Math.round(balanceUsedInPercentage) > 60 ? (
                      <>
                        <div
                          className="radial-progress text-green-500/85 mt-4"
                          style={{ "--value": balanceUsedInPercentage }}
                          role="progressbar"
                        >
                          {Math.round(balanceUsedInPercentage)}%
                        </div>
                        <p className="w-full text-center mb-4 text-lg">
                          Balance Used : {cardStatus?.usedBalance} / {cardStatus?.creditLimit}{" "}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="w-full text-center mt-4 text-lg">
                          Balance Used : {cardStatus?.usedBalance} / {cardStatus?.creditLimit}{" "}
                        </p>
                        <div
                          className="radial-progress text-green-500/85 mt-4"
                          style={{ "--value": balanceUsedInPercentage }}
                          role="progressbar"
                        >
                          {Math.round(balanceUsedInPercentage)}%
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-2 bg-white bg-opacity-15 backdrop-blur-lg rounded-xl p-10 max-h-[100vh] md:max-h-[59vh] text-white">
                <div className="w-auto h-[10%] -mt-8 text-center flex flex-row flex-wrap justify-between p-8">
                  <button
                    onClick={() => {
                      paginationBack();
                    }}
                    className="bg-teal-400/80 hover:bg-teal-300/90 w-[12%] h-[3.2vh] rounded-3xl -mt-4"
                  >
                    Back
                  </button>
                  <h2 className="text-xl font-semibold content-center -mt-6">
                    Transactions
                    <span>
                      <br />
                      {txPagination == 1
                        ? txPagination
                        : txPagination * 10 - 10}
                      -
                      {txPagination * 10 >= txArray?.length
                        ? txArray?.length
                        : txPagination * 10}
                    </span>
                  </h2>
                  <button
                    onClick={() => {
                      paginationForward();
                    }}
                    className="bg-teal-400/80 hover:bg-teal-300/90 w-[12%] h-[3.2vh] rounded-3xl -mt-4"
                  >
                    Next
                  </button>
                </div>
                <div className="md:h-[49vh] mt-4">
                  {currentTxArray?.length > 0 ? (
                    <Transactions txArray={currentTxArray} />
                  ) : (
                    "You have no Transactions, please try again after u had some transactions."
                  )}
                </div>
              </div>

              <div className="bg-white bg-opacity-15 backdrop-blur-lg rounded-xl p-6 text-white">
                <h1 className="text-center text-2xl mb-4">My {isHistory ? "History" : "Subscriptions"}</h1>
                  {isHistory ? (
                  <div id="historyDetails" className=''>
                      <CardDetails isHistory={isHistory} dataArray={cardHistory} />
                  </div>
                  ) 
                  : (
                  <div id="subscriptionDetails" className=''>
                      <CardDetails isHistory={isHistory} dataArray={cardSubs} />
                  </div>
                  )}
                  <button className="w-[50%] bg-teal-400 rounded-3xl h-auto md:h-10 ml-[25%] mt-4" onClick={()=>setIsHistory(!isHistory)}>
                    Watch {isHistory ? "Subscriptions" : "History" }
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
