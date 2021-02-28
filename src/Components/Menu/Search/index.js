import React from 'react'
import { connect } from 'react-redux'
import { Input } from 'reactstrap'

function MySearch() {
    return (
        <div className="Search">
            <Input type="text" disabled={false} placeholder="Search"/>
        </div>
    )
}
function StateToProps(state) {
    console.log(state)
    return;
}

export default connect(StateToProps)(MySearch);
