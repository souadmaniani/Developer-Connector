import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'

import React from 'react'

const PrivateRoute = ({component: Component, ...rest}) => {
    const { auth }= useSelector(state => state);
    const { isAuthentified } = auth;
    return (
        <Route
        {...rest}
        render= { () => isAuthentified ? <Component /> : <Redirect to="/login" /> }
        />
    )
}

export default PrivateRoute
