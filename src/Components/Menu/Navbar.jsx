import React, { useEffect, useState } from "react";
import Maps from "../Map/Maps";
import { Input, InputGroup } from "reactstrap";
import "./Navbar.css";
import { connect } from "react-redux";
import 

function twoDigit(number) {
  if (number < 10) {
    return ("0" + number).toString();
  } else {
    return number.toString();
  }
}

function fourDigit(number) {
  if (number < 1000) {
    if (number < 100) {
      if (number < 10) {
        if (number == 0) {
          return "0000";
        } else {
          return ("000" + number).toString();
        }
      } else {
        return ("00" + number).toString();
      }
    } else {
      return ("0" + number).toString();
    }
  } else {
    return number.toString();
  }
}

function MenuBar() {
  useEffect(()=>{
    dispatch(getWilayah())
  })
  return(
    <>
    <div className="Navbar">
      <InputGroup>
        <Input type='select'></Input>
        <Input type='select'></Input>
        <Input type='select'></Input>
      </InputGroup>
    </div>
    <Maps/>
    </>
  )
}

export default connect()(MenuBar);