import React, { createContext, useReducer, useState } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// initial state
const initialState = {
    transactions: [],
    error: null,
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const [loading, setLoading] = useState(null);
    const [dbLoading, setDbLoading] = useState(null);

    // Actions
    async function getTransactions(username, month, year) {
        
        try {
            const res = await axios.get(`/api/Expense/${username}?month=${month}&year=${year}`);
            setDbLoading(true);
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data,
                
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
        loading,
        dbLoading,
        setDbLoading,
        getTransactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}
    </GlobalContext.Provider>);
}