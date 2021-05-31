import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'


export const TransactionForm = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);

    const { addTransaction } = useContext(GlobalContext);

    const user = JSON.parse(localStorage.getItem('token'));

    const onSubmit = e => {
        e.preventDefault();

        const newTransaction = {
            userId: +user.id,
            text,
            amount: +amount
        }

        addTransaction(newTransaction);
    }

    return (
        <>
            <h3>Dodaj nową transakcję</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-control">
                    <label className="transactionLabel" htmlFor="text">Nazwa</label>
                    <input required type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Wprowadź nazwę" />
                    </div>
                    <div className="form-control">
                    <label className="transactionLabel" htmlFor="amount"
                        >Kwota <br />
                        (Jeśli chcesz dodać wydatek, przed kwotą wprowadź minusa " - ")</label
                    >
                    <input required type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Wprowadź kwotę" />
                    </div>
                    <button className="btn">Dodaj transakcję</button>
                </form>
        </>
    )
}
