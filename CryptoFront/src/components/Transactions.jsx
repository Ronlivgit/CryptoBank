import React, { useEffect, useState } from 'react'
import { baseOperatorUrl } from '../config/Api'
import { useSelector } from 'react-redux'

const Transactions = () => {

    const [txArray,setTxArray] = useState([])
    const user = useSelector((state)=> state.user)
    
    useEffect(()=>{
        const asyncFetch = async() => {
            console.log("user token : " , user.token);
            const response = await fetch(`${baseOperatorUrl}/history`,{headers: {Authorization : `Bearer ${user.token}`}})
            const data = await response.json()
            setTxArray(data.history)
        }
        asyncFetch()
    },[])
    console.log("TxArray : " , txArray);
  return (
    <div>
        {txArray.map((item)=>{
            return(
                // eslint-disable-next-line react/jsx-key
                <div>
                    <p>{item.amount}</p>
                    <p>{item.from}</p>
                    <p>{item.operationType}</p>
                    <p>{item.to}</p>
                </div>
            )
        })}
    </div>
  )
}

export default Transactions