import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Welcome from './Pages/Welcome'

export default function Routes() {
    return (
        <>
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Welcome/>
                </Route>
            </Switch>
        </BrowserRouter>
        </>
    )
}
