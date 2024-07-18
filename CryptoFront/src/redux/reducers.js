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
        },
        setBnsName: (state, action) => {
            if (state.user) {
                state.user.bnsName = action.payload;
            }
        },
        setUserBalance : (state,action) => {
            if(state.user){
                state.balance = action.payload;
            }
        },
    },
})

export const {setUser , logoutUser , setBnsName , setUserBalance} = userSlice.actions;

export default userSlice.reducer;