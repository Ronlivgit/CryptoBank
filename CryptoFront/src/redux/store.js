// import {configureStore} from 'redux'
import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./reducers";
import { loadState, saveState } from "../utils/localStorage";

const preloadedState = loadState()

export const store = configureStore({
    reducer : {
        user : userReducer,
    },
    preloadedState
});

store.subscribe(()=>{
    saveState(store.getState())
})
