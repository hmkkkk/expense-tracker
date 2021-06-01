import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalState';
import { Transaction } from './Transaction';
import * as ReactBootStrap from 'react-bootstrap';
import Select from 'react-select';

export const TransactionList = () => {
    const { transactions, getTransactions, dbLoading, setDbLoading } = useContext(GlobalContext);

    const user = JSON.parse(localStorage.getItem('token'));
    let newDate = new Date()
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    const data = [
        {
          value: 1,
          label: "Styczen"
        },
        {
          value: 2,
          label: "Luty"
        },
        {
          value: 3,
          label: "Marzec"
        },
        {
          value: 4,
          label: "Kwiecien"
        },
        {
          value: 5,
          label: "Maj"
        },
        {
          value: 6,
          label: "Czerwiec"
        },
        {
            value: 7,
            label: "Lipiec"
        },
        {
            value: 8,
            label: "Sierpień"
        },
        {
            value: 9,
            label: "Wrzesień"
        },
        {
            value: 10,
            label: "Październik"
        },
        {
            value: 11,
            label: "Listopad"
        },
        {
            value: 12,
            label: "Grudzień"
        }
      ];

      // set value for default selection
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);
 
  // handle onChange event of the dropdown

  const filterChanges = e => {
      e.preventDefault()
      setDbLoading(false)
      getTransactions(user.username, selectedMonth, selectedYear)
  }

    useEffect(() => {
        getTransactions(user.username, month, year);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
        <>
         <h3>Historia</h3>
         <div className="wrapper">
         <Select
         className="test ml-1"
        placeholder="Select Option"
        value={data.find(obj => obj.value === selectedMonth)} // set selected value
        options={data} // set list of the data
        onChange={(e)=>{setSelectedMonth(e.value)}} // assign onChange function
      />
      <input className="yearInput test" 
      type="number"
      value={selectedYear} 
      onChange={(e)=>{setSelectedYear(e.target.value)}} placeholder="Wprowadź kwotę" />
         </div>
         
      <button onClick={filterChanges} className="btn">Filtruj</button>
      
      
         {dbLoading ? 
         <ul className="list">
             {transactions.map(transaction => (<Transaction key={transaction.id} transaction={transaction} /> ))}
         </ul>  :
         <ReactBootStrap.Spinner animation="grow" variant="info" />
         }
        </>
    )
}
