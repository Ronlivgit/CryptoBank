import BalanceBox from '@/components/BalanceBox'
import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import React from 'react'

const Home = () => {

  const loggedIn = {firstName : "Ron" , lastName : "ASD" , fullName : "Ron ASD" , email : "a@a.com"}


  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage ur account and transactions."
          />

          <BalanceBox 
            accounts={[]}
            totalBanks={1}
            currentBalance={619.420}
          />
        </header>

        recent Txs
      </div>

      <RightSideBar
      user={loggedIn}
      transactions={[]}
      cards={[{userId : "69" , balance : 500 , limit : 5000 , isBlocked:false},
        {userId : "420" , balance : 420 , limit : 4200 , isBlocked:false}]}
      />
    </section>
  )
}

export default Home