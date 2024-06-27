import { useDispatch, useSelector } from "react-redux";
import { baseBnsUrl, baseOperatorUrl } from "../config/Api";
import { setUser } from "../redux/reducers";
import { useEffect } from "react";

export const checkAddressesBNS = async (addressArray, user) => {
  try {
    const results = await Promise.all(
      addressArray.map(async (address) => {
        try {
          console.log("fetching address: ", address);
          const response = await fetch(`${baseBnsUrl}/byAddress/${address}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            return data.data;
          } else {
            console.log("Failed to fetch for address:", address);
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
    console.log("data : ", data.history);
    return data.history;
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

