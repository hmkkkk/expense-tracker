import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';

export const Register = ({setToken}) => {
    const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function registerUser(credentials) {
  return fetch('/api/Account/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => {
      if (data.status !== 200) { setError("Coś poszło nie tak");}
      if(data.status === 400) {setError("Nazwa uzytkownika jest zajęta")}
      else {return data.json()}
    })
 }

  const handleSubmit = async e => {
    var FormOk = true;

    e.preventDefault();
    setLoading(true)
    if (username.length < 4 || username.length > 20) {
        setError("Nazwa powinna mieć od 4 do 20 znaków")
        FormOk = false;

    }
    if (password.length < 4 || password.length > 20) {
        setError("Hasło powinno mieć od 4 do 20 znaków")
        FormOk = false;

    }
    if (password !== confirmPassword) {
        setError("Hasła muszą być takie same")
        FormOk = false;

    }
    if(FormOk === true)
    {
        const token = await registerUser({
            username,
            password
          });
          setLoading(false)
            setToken(token);
    }
    
  }

    return (
        <>
        <div>
        <h1>Zarejestruj się</h1>
        <form onSubmit={handleSubmit} >
            <div className="form-control">    
                <label htmlFor="login">
                    <p>Nazwa użytkownika</p>
                </label>
                <input type="text" required onChange={e => setUserName(e.target.value)}/>
            </div>
            <div className="form-control">
                <label htmlFor="password">
                    <p>Hasło</p>
                </label>
                <input type="password" required onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="form-control">
                <label htmlFor="password">
                    <p>Potwierdź hasło</p>
                </label>
                <input type="password" required onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            <div>
                <button className="btn" type="submit">Zarejestruj się</button>
            </div>
        </form>
        
        <h5>Masz już konto? <Link to="/">Zaloguj się</Link> </h5>
    </div>
    {error && <p className="errorp">{error}</p>}
    {loading && <div className="center" ><ReactBootStrap.Spinner animation="grow" variant="info" /></div>}
    </>
    )
}
