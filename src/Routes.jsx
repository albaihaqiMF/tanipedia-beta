import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Kuliah from './Pages/Kuliah'
import Welcome from './Pages/Welcome'

export default function Routes() {
    return (
        <>
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Welcome/>
                </Route>
                <Route path='/gis_kuliah'>
                    <Kuliah/>
                </Route>
            </Switch>
        </BrowserRouter>
        </>
    )
}
