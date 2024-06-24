import React, { useEffect, useState } from 'react';
import { baseBnsUrl, baseOperatorUrl } from '../config/Api';
import { useSelector } from 'react-redux';
import { checkArrayBNS } from '../utils/generalFunctions';

const Transactions = () => {
    const [txArray, setTxArray] = useState([]);
    const [bnsArray, setBnsArray] = useState([]);
    const user = useSelector((state) => state.user);

    // Fetch transaction history once the component mounts
    useEffect(() => {
        const asyncFetchTxs = async () => {
            try {
                const response = await fetch(`${baseOperatorUrl}/history`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                const data = await response.json();
                setTxArray(data.history);
                console.log("asyncFetchTxs Done");
            } catch (error) {
                console.error("Failed to fetch transaction history:", error);
            }
        };
        asyncFetchTxs();
    }, [user.token]);

    // Fetch BNS data when txArray is updated
    useEffect(() => {
        const fetchBnsArray = async () => {
            try {
                // Use a Set to store unique addresses
                const uniqueAddresses = new Set();
                // Extract unique 'to' and 'from' addresses from txArray
                txArray.forEach(item => {
                    if (item.to && item.to !== "0x0000000000000000000000000000000000000000") {
                        uniqueAddresses.add(item.to);
                    }
                    if (item.from && item.from !== "0x0000000000000000000000000000000000000000") {
                        uniqueAddresses.add(item.from);
                    }
                });
                // Convert the Set to an array
                const addressArray = Array.from(uniqueAddresses);
                console.log("Unique Addresses:", addressArray);
                // Fetch BNS data for unique addresses
                if (addressArray.length > 0) {
                    const checkedBns = await checkArrayBNS(addressArray, user);
                    setBnsArray(checkedBns);
                }
            } catch (error) {
                console.error("Failed to fetch BNS data:", error);
            }
        };

        if (txArray.length > 0) {
            fetchBnsArray();
        }
    }, [txArray, user]);

    // Helper function to get BNS name
    const getBnsName = (address) => {
        const bnsEntry = bnsArray.find(bns => bns[0] === address);
        return bnsEntry ? bnsEntry[1] : null;
    };

    return (
        <div className='w-full h-full flex flex-wrap gap-4 justify-center overflow-x-auto '>
            <table className='table text-center'>
                <thead className=''>
                    <tr className='text-white'>
                        <th className='border border-black/50'>Date</th>
                        <th className='border border-black/50'>Operation</th>
                        <th className='border border-black/50'>From</th>
                        <th className='border border-black/50'>To</th>
                        <th className='border border-black/50'>Amount</th>
                    </tr>
                </thead>
                <tbody className='border-[] border-orange-700'>
                    {txArray.map((item) => {
                        const date = new Date(item.timestamp * 1000).toLocaleDateString();
                        const fromBns = getBnsName(item.from);
                        const toBns = getBnsName(item.to);
                        
                        const from = item.from === "0x0000000000000000000000000000000000000000" ? "CryptoBank" : item.from;
                        const to = item.to === "0x0000000000000000000000000000000000000000" ? "CryptoBank" : item.to;

                        const isIncome = item.from !== user.user.activeAccount.address && item.amount > 0

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
                            <tr key={item.timestamp} className='border text-white text-center'>
                                <th className='border border-black/50'>{date}</th>
                                <td className='border border-black/50'>{item.operationType}</td>
                                <td className='border border-black/50'>
                                    <span className='hoverable'>
                                        {fromBns || from}
                                        {fromBns && <span className='hover-text'>{from}</span>}
                                    </span>
                                </td>
                                <td className='border border-black/50'>
                                    <span className='hoverable'>
                                        {toBns || to}
                                        {toBns && <span className='hover-text'>{to}</span>}
                                    </span>
                                </td>
                                <td className='border border-black/50 text-xl'>
                                    {isIncome ? 
                                        <span className='text-green-400'>+{item.amount}</span> :
                                        <span className='text-red-500'>{item.amount}</span>
                                    }
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
