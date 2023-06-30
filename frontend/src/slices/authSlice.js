import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    // if local storage stores user retrieve and use it if not set it to null
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null 
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredential: (state, action) =>{ // action is whats passed in the method
            state.userInfo = action.payload; //updates the current value of state
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        logout: (state) =>{
            state.userInfo = null;
            localStorage.removeItem('userInfo')
        }

    }

})

// these are all the redux function created above
export const { setCredential, logout} = authSlice.actions
export default authSlice.reducer;