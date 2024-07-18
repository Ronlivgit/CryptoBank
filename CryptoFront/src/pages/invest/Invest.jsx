import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { useLoaderData } from "react-router-dom";
import InvestForm from "../../components/InvestForm";
import { setUserBalance } from "../../redux/reducers";
import UserHoldings from "../../components/UserHoldings";
import { useEffect, useState } from "react";
import { getInvestmentPositions } from "../../utils/generalFunctions";

export default function Invest() {

  const user = useSelector((state) => state.user);
  const loaderData = useLoaderData()
  const dispatch = useDispatch()
  const {userHoldings,tokenSelection,userBalance} = loaderData || {}
  dispatch(setUserBalance(userBalance))
  const [positions,setPositions] = useState()

  useEffect(()=>{
    const getPositions = async ()=> {
      let tempArray = []
      userHoldings.tokens.map(async (item)=>{
        const position = await getInvestmentPositions(user,item)
        tempArray.push({token : position.token , data : position.data})
        return tempArray
      })
      setPositions(tempArray)
    }
    getPositions()
  },[user, userHoldings.tokens])


  return (
    <>
      <Navbar/>
      <div className="flex flex-col bg-stone-800/70 w-[100vw] h-auto md:h-[97.3vh] overflow-y-auto md:overflow-y-hidden overflow-x-hidden -mt-[2vh]">
        <div className="bg-gradient-to-tr from-zinc-700 via-slate-700 to-stone-800/90 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:mt-4">
            <div className="col-span-1 lg:col-span-2 bg-white bg-opacity-15 backdrop-blur-lg rounded-xl p-4 text-white h-[95%] md:h-[30vh]">
            {/* Tokens summary (show total expense,income,etc...) */}
              <UserHoldings userHoldings={userHoldings}/>
            </div>
            <div className="col-span-1 lg:col-span-1 bg-white bg-opacity-15 backdrop-blur-lg rounded-xl text-white h-auto md:h-[30vh]">
              <InvestForm tokenSelection={tokenSelection} />
            </div>
          </section>
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4 z-20">
            <div className="col-span-1 lg:col-span-3 bg-white bg-opacity-15 backdrop-blur-lg 
            rounded-xl p-6 text-white h-auto md:h-[60vh]">
              <div className="-mt-10 h-full">
              {/* Showcase the investment, allow dropdown to see multiple options include history of txs and etc */}
                {/* <StockTrack topTokens={tokenSelection}/> */}
              </div>
            </div>
          </section>
        </div>
        </div>
      </div>
    </>
  )
}
