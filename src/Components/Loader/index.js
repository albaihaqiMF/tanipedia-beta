import React from 'react'
import { Spinner } from 'reactstrap'

const myClasses = {
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
