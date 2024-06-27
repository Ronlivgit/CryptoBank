/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import Transactions from "../../components/Transactions"
import TransferForm from "../../components/TransferForm"
import { useEffect, useState } from "react";
import { asyncFetchTxs } from "../../utils/generalFunctions";
import BNSForm from "../../components/BNSForm";


const CardPage = () => {
// Register BNS , Create Card , 
    const user = useSelector((state)=> state.user)
    const [txArray,setTxArray] = useState([])
    const [txPagination,setTxPagination] = useState(1)
    const [currentTxArray,setCurrentTxArray] = useState([])

    useEffect(() => {
        asyncFetchTxs(user).then((value)=>{setTxArray(value) , setCurrentTxArray(value.slice(0,10))})
    }, [user.token]);

    useEffect(()=>{
        setCurrentTxArray(txArray.slice((txPagination-1)*10,((txPagination-1)*10)+10))
    },[txArray, txPagination])

    const paginationForward = () => {
        if(((txPagination-1)*10)+10 < txArray.length){
            console.log("txPagination : " , txPagination+1);
            setTxPagination(txPagination+1)
        }
    }

    const paginationBack = () => {
        if(txPagination > 1){
            console.log("txPagination : " , txPagination-1);
            setTxPagination(txPagination-1)
        }
    }


  return (
    <div className="flex flex-col bg-stone-800/70 w-[100vw] h-auto md:h-[97.3vh] overflow-y-auto md:overflow-y-hidden overflow-x-hidden -mt-[2vh]">
        <div className="bg-gradient-to-tr from-zinc-700 via-slate-700 to-stone-800/90 min-h-screen">
        <div className="container mx-auto px-4 py-8 ">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                <div className="col-span-2 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white h-[30vh]">
                    <div className="flex flex-row flex-wrap h-[25vh] justify-evenly mb-4 gap-4 w-[49%] bg-red-400">
                        <h2 className="text-xl font-semibold mb-4 text-center mt-6">Transfer Funds</h2>
                        <TransferForm />
                    </div>
                    <div className="flex flex-row flex-wrap justify-evenly 
                    relative -top-[26.3vh] left-[51%] w-[49%] bg-cyan-600 h-[25vh]">
                        <h2 className="text-xl font-semibold mb-4 text-center mt-6">BNS Registry : </h2>
                        <BNSForm/>
                        {/* BNS Registry form */}
                    </div>
                    {/* <h2 className="text-xl font-semibold">Personal Account</h2> */}
                    {/* <button className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded-lg transition">Add Card</button> */}
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 text-white">

                    <img src='https://shorturl.at/rSz8Z' height={50} width={200} className="rounded-2xl"/>
                        <div className="size-auto w-[20%] ml-[5%] rounded-full bg-transparent">
                            {/* Calculate Current/Limit and turn to % then IF ELSE : if value > 65 : red color , else : green color */}
                            <p className="w-full -ml-[10%] mb-4">Credit : current/limit </p>
                            <div className="radial-progress text-green-500/85" style={{"--value":50}} role="progressbar">50%</div>
                        </div>
                </div>

                <div className="col-span-2 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-10 max-h-[100vh] md:max-h-[59vh] text-white">
                    <div className="w-auto h-[10%] -mt-8 text-center flex flex-row flex-wrap justify-between p-8">
                        <button onClick={()=>{paginationBack()}} 
                        className="bg-teal-400/80 hover:bg-teal-300/90 w-[12%] h-[3.2vh] rounded-3xl -mt-4">Back</button>
                        <h2 className="text-xl font-semibold content-center -mt-6">Transactions
                            <span><br/>{txPagination == 1 ? txPagination : txPagination*10-10}-{(txPagination*10) >= txArray.length ? txArray.length : txPagination*10}</span></h2>
                        <button onClick={()=>{paginationForward()}} 
                        className="bg-teal-400/80 hover:bg-teal-300/90 w-[12%] h-[3.2vh] rounded-3xl -mt-4">Next</button>
                    </div>
                    <div className="h-[50vh] mt-4">
                        {currentTxArray.length >= 1 ? <Transactions txArray={currentTxArray}/> : ""}
                    </div>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white">
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