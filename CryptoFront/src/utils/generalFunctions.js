import { baseBnsUrl, baseCardUrl, baseInvestUrl, baseOperatorUrl, coinGeckoApiKey } from "../config/Api";

export const checkAddressesBNS = async (addressArray, user) => {
  try {
    const results = await Promise.all(
      addressArray.map(async (address) => {
        try {
          const response = await fetch(`${baseBnsUrl}/byAddress/${address}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            return data.data;
          } else {
            return null;
          }
        } catch (error) {
          console.error(`Error fetching BNS for address ${address}:`, error);
        }
      })
    );
    const temporaryArr = results.filter((result) => result !== null);
    return temporaryArr;
  } catch (error) {
    console.error("Error in checkAddressesBNS:", error);
    return [];
  }
};

export const asyncFetchTxs = async (user) => {
  try {
    const response = await fetch(`${baseOperatorUrl}/history`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const data = await response.json();
    if(data){
      console.log("data : " , data)
      return data?.history.reverse();
    }
  } catch (error) {
    console.error("Failed to fetch transaction history:", error);
  }
};

export const fetchBalance = async (user) => {
  try {
    const response = await fetch(`${baseOperatorUrl}/`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const data = await response.json();
    return data.balance;
  } catch (error) {
    console.error("Failed to fetch balance:", error);
    throw error;
  }
};


export const getBnsInfo = async (bnsName,user) => {
  try {
    // /byBns/:bnsName
    const response = await fetch(`${baseBnsUrl}/byBns/${bnsName}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      return null;
    }

  } catch (error) {
    console.error("error fetching bnsInfo : " , error);
  }
}

export const getCardInfo = async(user) => {
  try {
    const response = await fetch(`${baseCardUrl}/`,{
      headers : {
        Authorization : `Bearer ${user.token}`
      },
    })
    if(response.ok){
      const data = await response.json()
      return data.result
    }
  } catch (error) {
    console.error(error);
  }
}

export const getCardHistory = async(user) => {
  try {
    const response = await fetch(`${baseCardUrl}/history`,{
      headers : {
        Authorization : `Bearer ${user.token}`
      },
    })
    if(response.ok){
      const data = await response.json()
      return data.result
    }
  } catch (error) {
    console.error(error);
  }
}

export const getCardSubs = async(user) => {
  try {
    const response = await fetch(`${baseCardUrl}/subscriptions`,{
      headers : {
        Authorization : `Bearer ${user.token}`
      },
    })
    if(response.ok){
      const data = await response.json()
      return data.result
    }
  } catch (error) {
    console.error(error);
  }
}

export const getInvestmentHoldings = async(user) => {
  try {
    const response = await fetch(`${baseInvestUrl}/allHoldings`,{
      headers : {
        Authorization : `Bearer ${user.token}`
      },
    })
    if(response.ok){
      const data = await response.json()
      console.log("data : " , data.receipt)
      return data.receipt
    }
  } catch (error) {
    console.error("error in getInvestmentHoldings : " , error)
  }
}

export const getTopCryptoCurrencies = async(tokensPerPage) =>{
  try {
      const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': `${coinGeckoApiKey}`}
      };
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${tokensPerPage}&page=1`, options)
      if(response.ok){
        const data = await response.json()
        console.log("data : " , data)
        return data
      }
  } catch (error) {
    console.error('Error fetching stocks:', error);
  }
}


export const getInvestmentPositions = async(user,tokenSymbol) => {
  try {
      const response = await fetch(`${baseInvestUrl}/tokenSummary/${tokenSymbol}`,{
        headers : {
          Authorization : `Bearer ${user.token}`
        },
      })
      const data = await response.json()
      return {token : tokenSymbol , data : data.finalPayload}
  } 
  catch (error) {
    console.error("error in getInvestmentsPositions : " , error);
  }
}

function generateBlockchainAddress() {
  const characters = '0123456789abcdef';
  let address = '0x';

  for (let i = 0; i < 40; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    address += characters[randomIndex];
  }

  return address;
}

export const executeInvestment = async(user,token,amount,operationType = "buy") => {
  try {
    const response = await fetch(`${baseInvestUrl}/operate`, {
      method: "POST",
      headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
         user: user.user.activeAddress,
         tokenAddress : generateBlockchainAddress(), //! Testnet, can't input real address and not multi-chain yet.
         tokenSymbol : token.symbol.toUpperCase(),
         tokenAmount : amount,
         tokenPrice : token.current_price,
         operationType
        })
    });
    const data = await response.json()
    return data
  }
  catch (error) {
    console.error("error in executeInvestment : " , error);
  }
}


export const operateBalance = async (user,amount) => {
  console.log("amount in operateBalance :" , amount)
  try {
    const response = await fetch(`${baseOperatorUrl}/increase`,{
      method : "POST",
      headers : {
        Authorization : `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        _to : user.user.activeAddress,
        amount
      })
    })
    const data = await response.json()
    console.log("operateBalance data : " , data)
    return data
  } catch (error) {
    console.error("operateBalance error : " , error);
  }
}