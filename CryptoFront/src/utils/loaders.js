import { json } from "react-router-dom";
import { asyncFetchTxs , getCardHistory , getCardSubs , getCardInfo, fetchBalance, getInvestmentHoldings, getTopCryptoCurrencies } from "./generalFunctions";
import { store } from "../redux/store";

export async function dashboardLoader() {
    const state = store.getState()
    const user = state.user
    try {
        const [txArray,cardStatus,cardHistory,cardSubs] = await Promise.all([
            asyncFetchTxs(user),
            getCardInfo(user),
            getCardHistory(user),
            getCardSubs(user),
        ])
        return json({txArray,cardStatus,cardHistory,cardSubs,user})
    } catch (error) {
        console.error(error)
        return json({error:"failed to load data"} , {status : 500})
    }
}

export async function homePageLoader() {
    const state = store.getState()
    const user = state.user
    try {
        const [txArray,userBalance,topTokens] = await Promise.all([
            asyncFetchTxs(user),
            fetchBalance(user),
            getTopCryptoCurrencies(10)
        ])
        return json({txArray,userBalance,topTokens})
    } catch (error) {
        console.error(error);
        return json({error:"failed to load data"} , {status : 500})
    }
}


export async function investPageLoader() {
    const state = store.getState()
    const user = state.user
    try {
        const [userHoldings,userBalance,tokenSelection] = await Promise.all([
            getInvestmentHoldings(user),
            fetchBalance(user),
            getTopCryptoCurrencies(250)
        ])
        return json({userHoldings,userBalance,tokenSelection})
    } catch (error) {
        console.error("error in investPage loader : " , error);
    }
}