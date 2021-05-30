import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// initial state
const initialState = {
    transactions: [],
    error: null,
    loading: true
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    async function getTransactions(username) {
        try {
            const res = await axios.get(`/api/Expense/${username}`);

            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
    }

   async function deleteTransaction(id) {
        try {
            await axios.delete(`api/Expense/${id}`);

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
        
    }

    async function addTransaction(transaction) {
        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/Expense', transaction, config)
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
        
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}
    </GlobalContext.Provider>);
}