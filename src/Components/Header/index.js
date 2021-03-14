import React from 'react'
import { Col, Row } from 'reactstrap'
import './Header.css'

export default function Header() {
    return (
        <>
        <Row>
            <Col xs={12} sm={3}>
                <p id="tanipedia">Tanipedia</p>
            </Col>
            <Col></Col>
        </Row>
        </>
    )
}
