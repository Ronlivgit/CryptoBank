import { SET_USER , LOGOUT_USER } from "./actions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    token : null
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser: (state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logoutUser : (state) => {
            state.user = null
            state.token = null
        }
    },
})

export const {setUser , logoutUser} = userSlice.actions;

export default userSlice.reducer;