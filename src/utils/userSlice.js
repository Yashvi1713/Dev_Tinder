import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState: null,   // maintain initial state
    reducers: {
        // defining various actions 
        addUser : (state, action)=>{
            return action.payload;
        },
        removeUser: (state, action)=>{
            return null;
        }
    }
});


export const {addUser, removeUser} = userSlice.actions; // Imported in the login file using dispatch hook we are sending the action inside the userSlice
export default userSlice.reducer; //imported in appStore where the reducers are maintained