import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MenuBar from './Components/Menu/Navbar'

export default function Routes() {
    return (
        <>
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <MenuBar/>
                </Route>
            </Switch>
        </BrowserRouter>
            
        </>
    )
}
