import { useDispatch, useSelector } from "react-redux";
import { baseBnsUrl, baseCardUrl, baseOperatorUrl } from "../config/Api";
import { setUser } from "../redux/reducers";
import { useEffect } from "react";

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
    return data.history.reverse();
  } catch (error) {
    console.error("Failed to fetch transaction history:", error);
  }
};

export const useFetchBalance = (user) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  useEffect(() => {
    const asyncGetBalance = async () => {
      try {
        const response = await fetch(`${baseOperatorUrl}/`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await response.json();
        dispatch(
          setUser({
            user: currentUser.user,
            token: currentUser.token,
            balance: data.balance,
          })
        );
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    };
    asyncGetBalance();
  }, [dispatch, user.token, currentUser]);
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