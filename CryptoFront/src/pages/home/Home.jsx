import React, { useEffect, useState } from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import Transactions from "../../components/Transactions";

export default function HomePage() {

  const user = useSelector((state)=> state.user)
  useEffect(()=>{
    console.log("useEffect user : " , user);
  },[user])

  return (
    <div className="h-[96vh] -mt-[8px] flex">
      {/* Black Background : left Side */}
      <div className="bg-slate-800/90 w-[70vw] h-full ">
      {/* Balance + Graphs */}
        <div className="bg-sky-300 h-[43%] mt-[0.5%]">
          <h1>Welcome and etc, graphs, balance , ++</h1>
        </div>
        {/* Transactions History*/}
        <div className=" h-[56.3%] flex flex-col justify-evenly">
        {/* Create a Card or something to show the TXS based on the data, make every address a BNS */}
          <div className="text-center w-auto">
            <h1 className="text-4xl w-auto font-bold text-white/85 m-2">Your Transactions History </h1>
          </div>
          {/* Transaction cards div */}
          <div className="flex flex-col flex-wrap gap-3 h-[35vw]">
            <Transactions />
          </div>
        </div>
      </div>
      {/* Green BackGround : Right Side , unrelated to left side. */}
      
      <div className="bg-green-500 w-[30vw] h-full ">
        {/* Credit Card, Quick Actions */}
      </div>

    </div>
  );
}

//BACKUP : 

      // <div className="bg-blue-400 w-[27vw] h-full">
      //   {/* Graphs and Friend List?. */}
      // </div>

      // <div className="bg-black w-[46vw] h-full ">
      //   {/* Transactions History + Balance + Graphs  */}
      // </div>
