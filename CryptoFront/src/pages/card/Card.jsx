import { useSelector } from "react-redux";
import Transactions from "../../components/Transactions"
import TransferForm from "../../components/TransferForm"
import { useEffect, useState } from "react";
import { baseOperatorUrl } from "../../config/Api";

const CardPage = () => {

// Register BNS , Create Card , 
    const user = useSelector((state)=> state.user)
    const [txArray,setTxArray] = useState([])

    useEffect(() => {
    const asyncFetchTxs = async () => {
        try {
            const response = await fetch(`${baseOperatorUrl}/history`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            const data = await response.json();
            setTxArray(data.history);
            console.log("asyncFetchTxs Done");
        } catch (error) {
            console.error("Failed to fetch transaction history:", error);
        }
    };
    asyncFetchTxs();
    }, [user.token]);



  return (
    <div className="flex flex-col bg-stone-800/70 w-[100vw] h-auto md:h-[97.3vh] overflow-y-auto md:overflow-y-hidden overflow-x-hidden -mt-[2vh]">
        <div className="bg-gradient-to-tr from-zinc-700 via-slate-700 to-stone-800/90 min-h-screen">
        <div className="container mx-auto px-4 py-8 ">
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Personal Account</h2>
                    <button className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded-lg transition">Add Card</button>
                </div>
                <div className="text-4xl font-bold mb-6">41,117.28 EUR</div>
                    <div className="flex space-x-4">
                        <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition">Send</button>
                        <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition">Receive</button>
                    </div>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white">
                    <h2 className="text-xl font-semibold mb-4 text-center">Transfer Funds</h2>
                    <TransferForm />
                </div>

                <div className="col-span-2 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-10 h-auto text-white">
                    <h2 className="text-xl font-semibold mb-4">Transactions</h2>
                    <Transactions txArray={txArray}/>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white">
                    <h2 className="text-xl font-semibold mb-4">Your Statistics</h2>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default CardPage