import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    token : null,
    balance : null,
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser: (state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.balance = action.payload.balance
        },
        logoutUser : (state) => {
            state.user = null
            state.token = null
            state.balance = null
        }
    },
})

export const {setUser , logoutUser , setBalance} = userSlice.actions;

export default userSlice.reducer;