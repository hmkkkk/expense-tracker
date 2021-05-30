import React from 'react'


function Logout() {
    
    function logOff() {
        localStorage.removeItem('token');
        window.location.reload();
    }
    return (
        <>
            <button className="logoutButton" onClick={logOff}>Wyloguj się</button>
        </>
    )
}

export default Logout
