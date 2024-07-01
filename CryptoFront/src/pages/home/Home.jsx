import "./Home.css";
import { useSelector } from "react-redux";
import Transactions from "../../components/Transactions";
import BankDashboard from "../../components/HomeCharts";
import StockTrack from "../../components/StockTracker";
import Navbar from "../../components/Navbar";
import { useLoaderData } from "react-router-dom";

export default function HomePage() {

  const user = useSelector((state)=> state.user)
  const { txArray, error } = useLoaderData();


  return (
    <>
    <Navbar />
    <div className="h-auto lg:h-[97.3vh] w-[100vw]  -mt-[2vh] flex flex-col flex-wrap overflow-y-auto
    md:overflow-hidden bg-gradient-to-tr from-zinc-700 via-slate-700 to-stone-800/90">
      {/* Black Background : left Side */}
        <div className="h-[43%] lg:w-[65%] bg-slate-800/50 text-center p-4">
            <BankDashboard currentBalance={user.balance} transactions={txArray[0]}/>
        </div>
        {/* Transactions History*/}
        <div className="h-[57%] lg:w-[65%] w-full flex flex-col justify-center bg-slate-800/50 p-4 ">
          <h1 className="text-2xl lg:text-4xl font-bold text-white/85 text-center relative lg:-top-[2vh]"> Recent Transactions </h1>
        {/* Create a Card or something to show the TXS based on the data, make every address a BNS */}
          {/* Transaction cards div */}
          <div className="flex flex-col flex-wrap w-[100%] md:w-[71.3%] md:ml-[15.5%] mt-4 h-[80%] bg-zinc-500/45">
            <Transactions txArray={txArray[0].slice(0,8)} />
          </div>
        </div>
        <div className="w-[100%] md:w-[35%] h-[98%] mt-6 bg-slate-800/50 p-6">
            <StockTrack />
        </div>
    </div>
    </>
  )
}
