import React from 'react';
import AccountListPopOverContent from './AccountListPopOverContent';
import * as faIcons from 'react-icons/fa';
import axios from 'axios';

function AccountListPopOverContent() {
    let username = localStorage.getItem("username");
    //get categories from db 

    



    return (
        <div>
            <h1>Hello , {username}</h1>
        </div>
    )
}

export default AccountListPopOverContent
