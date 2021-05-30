import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState';
import { Transaction } from './Transaction';

export const TransactionList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext);

    const user = JSON.parse(localStorage.getItem('token'));
    

    useEffect(() => {
        getTransactions(user.username);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
         <h3>Historia</h3>
         <ul className="list">
             {transactions.map(transaction => (<Transaction key={transaction.id} transaction={transaction} /> ))}
            
         </ul>  
        </>
    )
}
