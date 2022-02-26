import React from 'react'
import {Redirect,Route} from "react-router-dom"

let ProtectedRoutes = ({component:Cmp,...rest}) => (
    <Route 
    {...rest}
        render = {(props) => 
            localStorage.getItem('username') ? <Cmp {...props} /> :<Redirect to="/signin" />

        }
    />
)

export default ProtectedRoutes
