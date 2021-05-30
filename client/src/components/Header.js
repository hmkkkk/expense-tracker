import React from 'react'
import Logout from './Logout';

export const Header = ({username}) => {
    return (
        <>
        <h2>
            Witaj {username}!
        </h2>
        <h5>
            Nie jesteś {username}? <Logout />
        </h5>
        </>
    )
}
