/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import Transactions from "../../components/Transactions"
import TransferForm from "../../components/TransferForm"
import { useEffect, useState } from "react";
import { asyncFetchTxs, getCardHistory, getCardInfo } from "../../utils/generalFunctions";
import RegisterBNS from "../../components/RegisterBNS";
import BnsCard from "../../components/BnsCard";


const CardPage = () => {
// Register BNS , Create Card , 
    const user = useSelector((state)=> state.user)
    const [txArray,setTxArray] = useState([])
    const [txPagination,setTxPagination] = useState(1)
    const [currentTxArray,setCurrentTxArray] = useState([])

    useEffect(() => {
        asyncFetchTxs(user).then((value)=>{setTxArray(value) , setCurrentTxArray(value.slice(0,10))})
        getCardInfo(user)
        getCardHistory(user)
    }, [user.token]);

    useEffect(()=>{
        setCurrentTxArray(txArray.slice((txPagination-1)*10,((txPagination-1)*10)+10))
    },[txArray, txPagination])

    const paginationForward = () => {
        if(((txPagination-1)*10)+10 < txArray?.length){
            setTxPagination(txPagination+1)
        }
    }

    const paginationBack = () => {
        if(txPagination > 1){
            setTxPagination(txPagination-1)
        }
    }


  return (
    <div className="flex flex-col bg-stone-800/70 w-[100vw] h-auto md:h-[97.3vh] overflow-y-auto md:overflow-y-hidden overflow-x-hidden -mt-[2vh]">
        <div className="bg-gradient-to-tr from-zinc-700 via-slate-700 to-stone-800/90 min-h-screen">
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                <div className="col-span-2 bg-white bg-opacity-15 backdrop-blur-lg rounded-xl p-6 text-white h-[38vh] md:h-[30vh]">
                    <h1 className="text-center text-2xl -mt-4 mb-4 font-semibold">Balance : 
                        {user.balance > 0 ? 
                            <span className="text-green-500"> {user.balance}$ </span>
                        :
                            <span className="text-red-500"> -{user.balance}$ </span>
                        }
                    </h1>
                    <div className="flex flex-row flex-wrap md:h-[23vh] justify-evenly mb-4 gap-4 w-[49%] border rounded-3xl border-teal-400/85 ">
                        <h2 className="text-xl font-semibold mb-4 text-center mt-6 border-b-2 border-teal-400">Transfer Funds</h2>
                        <TransferForm />
                    </div>
                    <div className="flex flex-row flex-wrap justify-evenly rounded-3xl border border-teal-400/85
                    relative -top-[28.3vh] size-auto md:-top-[24.3vh] left-[51%] w-[49%] md:h-[23vh] ">
                        {user.user.bnsName === null ? 
                            <>
                            <h2 className="text-xl font-semibold mb-4 text-center mt-6 border-b-2 border-teal-400">BNS Registry : </h2>
                            <RegisterBNS/>
                            </>
                        :
                            <>
                            <BnsCard />
                            </>
                        }
                        {/* BNS Registry form */}
                    </div>
                    {/* <h2 className="text-xl font-semibold">Personal Account</h2> */}
                    {/* <button className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded-lg transition">Add Card</button> */}
                </div>

                <div className="bg-white bg-opacity-15 backdrop-blur-lg rounded-xl p-6 text-white">
                    <div className="size-auto w-full rounded-full flex flex-row flex-wrap justify-evenly">
                        <img src='https://shorturl.at/rSz8Z' height={50} width={200} className="rounded-2xl size-[65%]"/>
                        <div className="w-full flex flex-wrap justify-center gap-2">
                            <div className="radial-progress text-green-500/85 mt-4" style={{"--value":50}} role="progressbar">50%</div>
                            <p className="w-full text-center mb-4">Credit : current/limit </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 bg-white bg-opacity-15 backdrop-blur-lg rounded-xl p-10 max-h-[100vh] md:max-h-[59vh] text-white">
                    <div className="w-auto h-[10%] -mt-8 text-center flex flex-row flex-wrap justify-between p-8">
                        <button onClick={()=>{paginationBack()}} 
                        className="bg-teal-400/80 hover:bg-teal-300/90 w-[12%] h-[3.2vh] rounded-3xl -mt-4">Back</button>
                        <h2 className="text-xl font-semibold content-center -mt-6">Transactions
                            <span><br/>{txPagination == 1 ? txPagination : txPagination*10-10}-{(txPagination*10) >= txArray?.length ? txArray?.length : txPagination*10}</span></h2>
                        <button onClick={()=>{paginationForward()}} 
                        className="bg-teal-400/80 hover:bg-teal-300/90 w-[12%] h-[3.2vh] rounded-3xl -mt-4">Next</button>
                    </div>
                    <div className="md:h-[50vh] mt-4">
                        {currentTxArray.length >= 1 ? <Transactions txArray={currentTxArray}/> : ""}
                    </div>
                </div>

                <div className="bg-white bg-opacity-15 backdrop-blur-lg rounded-xl p-6 text-white">
                    <h2 className="text-xl font-semibold mb-4">Your Portfolio (Hardcoded for now)</h2>
                    {/* Total amount of operations, total balance , credit card info, loan info (? not sure about loans yet) 
                     BNS Name`  */}
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default CardPage