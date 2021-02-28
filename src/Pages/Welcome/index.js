import React from "react";
import { connect } from "react-redux";
import MyLoader from "../../Components/Loader";
import CardMaps from "../../Components/Map/ComponentMaps/CardMaps.";
import Maps from "../../Components/Map/Maps";
import Navbar from "../../Components/Menu/Navbar";

function Welcome(props) {
  return (
    <>
      <Navbar />

      <CardMaps />
      <Maps />
      {props.petani ? null : <MyLoader />}
    </>
  );
}

function mapStatetoProps(state) {
  console.log(state.optionMenu.lahan);
  return {
    petani: state.optionMenu.petani,
  };
}
export default connect(mapStatetoProps)(Welcome);
