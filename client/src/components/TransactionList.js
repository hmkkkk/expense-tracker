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
  const [selectedValue, setSelectedValue] = useState(month);
 
  // handle onChange event of the dropdown
  const handleChange = e => {
    setDbLoading(false)
    setSelectedValue(e.value);
    getTransactions(user.username, e.value, year)
  }

    useEffect(() => {
        getTransactions(user.username, month, year);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
        <>
         <h3>Historia</h3>
         <Select
         className="test"
        placeholder="Select Option"
        value={data.find(obj => obj.value === selectedValue)} // set selected value
        options={data} // set list of the data
        onChange={handleChange} // assign onChange function
      />
      
         {dbLoading ? 
         <ul className="list">
             {transactions.map(transaction => (<Transaction key={transaction.id} transaction={transaction} /> ))}
         </ul>  :
         <ReactBootStrap.Spinner animation="grow" variant="info" />
         }
        </>
    )
}
