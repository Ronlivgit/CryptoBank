import { baseBnsUrl } from "../config/Api";

export const checkArrayBNS = async (addressArray, user) => {
    try {
        const results = await Promise.all(addressArray.map(async (address) => {
            try {
                console.log("fetching address: ", address);
                const response = await fetch(`${baseBnsUrl}/byAddress/${address}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    return data.data
                } else {
                    console.log("Failed to fetch for address:", address);
                    return null;
                }
            } catch (error) {
                console.error(`Error fetching BNS for address ${address}:`, error);
            }
        }));
        const temporaryArr = results.filter(result => result !== null);
        console.log("temporaryArr in checkArrayBNS:", temporaryArr);
        return temporaryArr;
    } catch (error) {
        console.error("Error in checkArrayBNS:", error);
        return [];
    }
};
