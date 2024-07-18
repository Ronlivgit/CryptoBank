/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react'

const UserHoldings = ({userHoldings}) => {
    const userTokens = useMemo(()=>{return userHoldings.tokens},[userHoldings])
    const userAmounts = useMemo(()=>{return userHoldings.amounts},[userHoldings])

    useEffect(()=>{
      console.log("userAmounts : " , userAmounts)
      console.log("userTokens : " , userTokens)
    },[userAmounts , userTokens])

  return (
    <div className='w-full h-full flex flex-col flex-wrap  bg-red-600'>
      <div className='h-full w-3/6 bg-orange-800 text-center'>
        <h1>Tokens : </h1>
      </div>
      <div className='h-full w-3/6 bg-cyan-600 text-center'>
        <h1>Amounts : </h1>
        <div className='h-full w-full flex flex-col mt-6'>
          {/* {userAmounts.map((item)=>{
            console.log("item : " , item)
            return(
              <>
                <h1>{item}</h1>
              </>
            )
          })} */}
        </div>
      </div>
    </div>
  )
}

export default UserHoldings