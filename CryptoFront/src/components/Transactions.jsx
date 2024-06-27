/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { checkAddressesBNS } from "../utils/generalFunctions";

const Transactions = (props) => {
  const [bnsArray, setBnsArray] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBnsArray = async () => {
      try {
        // Use a Set to store unique addresses
        const uniqueAddresses = new Set();
        // Extract unique 'to' and 'from' addresses from props.txArray
        props.txArray.forEach((item) => {
          if (item.to) {
            uniqueAddresses.add(item.to);
          }
          if (item.from) {
            uniqueAddresses.add(item.from);
          }
        });
        // Convert the Set to an array
        const addressArray = Array.from(uniqueAddresses);
        console.log("Unique Addresses:", addressArray);
        if (addressArray.length > 0) {
          const checkedBns = await checkAddressesBNS(addressArray, user);
          setBnsArray(checkedBns);
        }
      } catch (error) {
        console.error("Failed to fetch BNS data:", error);
      }
    };

    if (props.txArray.length > 0) {
      fetchBnsArray();
    }
  }, [user]);

  const getBnsName = (address) => {
    const bnsEntry = bnsArray.find((bns) => bns[0] === address);
    return bnsEntry ? bnsEntry[1] : null;
  };

  return (
    <div className="lg:w-full lg:h-full flex flex-wrap gap-4 justify-center overflow-x-auto ">
      <table className="table text-center">
        <thead className="">
          <tr className="text-white font-semibold">
            <th className="border border-black/50">Date</th>
            <th className="border border-black/50">Operation</th>
            <th className="border border-black/50">From</th>
            <th className="border border-black/50">To</th>
            <th className="border border-black/50">Amount</th>
          </tr>
        </thead>
        <tbody className="">
          {props.txArray?.map((item) => {
            const date = new Date(item.timestamp * 1000).toLocaleDateString();
            const fromBns = getBnsName(item.from);
            const toBns = getBnsName(item.to);
            {
              /* 0x0000000000000000000000000000000000000000 */
            }
            const from = item.from;
            const to = item.to;

            const isIncome =
              item.from !== user.user.activeAddress && item.amount > 0;

            switch (item.operationType) {
              case "changeBalance":
                item.operationType = item.amount > 0 ? "Deposit" : "Withdrawal";
                break;
              case "transferBalance":
                item.operationType = isIncome ? "Received" : "Sent";
                break;
              default:
                break;
            }

            return (
              <tr
                key={item.timestamp}
                className="border text-white font-semibold text-center"
              >
                <th className="border border-black/50">{date}</th>
                <td className="border border-black/50">{item.operationType}</td>
                <td className="border border-black/50">
                  <span className="hoverable">
                    {fromBns ||
                      `${from.substring(0, 5)}.... ${from.substring(
                        from.length - 5,
                        from.length
                      )}`}
                    {fromBns && (
                      <span className="hover-text">{`${from.substring(
                        0,
                        5
                      )}.....${from.substring(
                        from.length - 5,
                        from.length
                      )}`}</span>
                    )}
                  </span>
                </td>
                <td className="border border-black/50">
                  <span className="hoverable">
                    {toBns ||
                      `${to.substring(0, 5)}.... ${to.substring(
                        to.length - 5,
                        to.length
                      )}`}
                    {toBns && (
                      <span className="hover-text">{`${to.substring(
                        0,
                        5
                      )}.....${to.substring(to.length - 5, to.length)}`}</span>
                    )}
                  </span>
                </td>
                <td className="border border-black/50 text-xl">
                  {isIncome ? (
                    <span className="text-green-400">+{item.amount}$</span>
                  ) : (
                    <span className="text-red-500">{item.amount}$</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
