import React from 'react'
import { connect } from 'react-redux'
import { Input } from 'reactstrap'

function MySearch() {
    return (
        <div className="Search">
            <input type="search" className="form-control"/>
        </div>
    )
}
function StateToProps(state) {
    console.log(state)
    return{
        search:null
    }
}

export default connect(StateToProps)(MySearch);
