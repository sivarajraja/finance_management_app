import {createSlice}  from "@reduxjs/toolkit";

const initialState = {
    totalIncome : 0,
    totalExpense : 0,
}

const transactionSlice = createSlice({
    name:"total",
    initialState,
    reducers:{
        addIncome(state,action){
            state.totalIncome=action.payload;
        },
        addExpense(state,action){
            state.totalExpense=action.payload;
        }
    }
});

export const {addIncome,addExpense} = transactionSlice.actions;
export default transactionSlice.reducer;