import { json } from "react-router-dom";
import { asyncFetchTxs , getCardHistory , getCardSubs , getCardInfo } from "./generalFunctions";
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
        const txArray = await Promise.all([
            asyncFetchTxs(user)
        ])
        return json({txArray})
    } catch (error) {
        console.error(error);
        return json({error:"failed to load data"} , {status : 500})
    }
}