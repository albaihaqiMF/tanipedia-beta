import React from 'react'
import { Spinner } from 'reactstrap'

const myClasses = {
    background:'transparent',
    position:'absolute',
    left:'0',
    top:'0',
    zIndex:'20',
    height:'100vh',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
}

export default function MyLoader() {
    return (
        <div style={myClasses}>
            <Spinner color="success" />
        </div>
    )
}
