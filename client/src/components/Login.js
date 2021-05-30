import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'




export default function Login({ setToken }) {
    const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const history = useHistory();

  async function loginUser(credentials) {
    return fetch('/api/Account/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
      setToken(token);
      history.push("/")
  }

  return(
      <div>
        <h1>Zaloguj się</h1>
        <form onSubmit={handleSubmit} >
            <div className="form-control">    
                <label htmlFor="login">
                    <p>Nazwa użytkownika</p>
                </label>
                <input type="text"  onChange={e => setUserName(e.target.value)}/>
            </div>
            <div className="form-control">
                <label htmlFor="password">
                    <p>Hasło</p>
                </label>
                <input type="password" onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
                <button className="btn" type="submit">Zaloguj się</button>
            </div>
        </form>
        <h5>Nie masz konta? <Link to="/register">Zarejestuj się</Link> </h5>
        {error && <p className="errorp">{error}</p>}
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}