import './App.css';
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from'./components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { TransactionForm } from './components/TransactionForm';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import  Login  from './components/Login';
import useToken from './components/UseToken';

import { GlobalProvider } from './context/GlobalState';



function App() {
  const { token, setToken } = useToken();
  const user = JSON.parse(localStorage.getItem('token'));

  if(!token) {
    return <Login setToken={setToken} />
  }
 
  return (
    <GlobalProvider>
      
      <Header username={user.username}/>
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <TransactionForm />
      </div>
    </GlobalProvider>
  );
}

export default App;
