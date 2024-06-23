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
    <div className="bg-red-500 h-[96vh] -mt-[8px] flex">
      {/* Black Background : left Side */}
      <div className="bg-black w-[70vw] h-full ">
      {/* Balance + Graphs */}
        <div className="bg-sky-300 h-[43%] mt-[0.5%]">
          <h1>Welcome and etc, graphs, balance , ++</h1>
        </div>
        {/* Transactions History*/}
        <div className="bg-amber-500 h-[56.3%] flex flex-col justify-evenly">
        {/* Create a Card or something to show the TXS based on the data, make every address a BNS */}
          <Transactions />
        </div>
      </div>
      {/* Green BackGround : Right Side */}
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
