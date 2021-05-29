import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'

export const TransactionForm = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);

    const { addTransaction } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();

        const newTransaction = {
            id: Math.floor(Math.random() * 100000000000000000000000000),
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
                    <label htmlFor="text">Nazwa</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Wprowadź nazwę" />
                    </div>
                    <div className="form-control">
                    <label htmlFor="amount"
                        >Kwota <br />
                        (Jeśli chcesz dodać wydatek, przed kwotą wprowadź minusa " - ")</label
                    >
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Wprowadź kwotę" />
                    </div>
                    <button className="btn">Dodaj transakcję</button>
                </form>
        </>
    )
}
