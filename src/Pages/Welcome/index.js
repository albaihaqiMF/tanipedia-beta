import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { APP_KEY, BaseUrl } from "../../Components/API";
import MyLoader from "../../Components/Loader";
import CardMaps from "../../Components/Map/ComponentMaps/CardMaps.";
import Maps from "../../Components/Map/Maps";
import Navbar from "../../Components/Menu/Navbar";
import { getLahan, getProfile } from "../../Redux/Action/OptionMenuActions";

function Welcome(props) {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    axios({
      method: "post",
      url: BaseUrl + "login",
      headers: {
        "APP-KEY": APP_KEY,
      },
      data: {
        username: "fahmi",
        password: "fahmi1234sayangnadyacelalu",
      },
    })
      .then(async (res) => {
        // localStorage.setItem("token", res.data.data.api_token);
        props.dispatch(getProfile(res.data.data.api_token));
        props.dispatch(getLahan(res.data.data.api_token));
        setLoad(false);
      })
      .catch((err) => console.log(err));
  }, [BaseUrl]);
  return (
    <>
      <Container fluid style={{ margin: "0", padding: "0" }}>
        <Navbar />
        <CardMaps />
        <Maps />
        {props.clicked == 0 && props.petani === null ? <MyLoader/> : null}
        {props.clicked == 1 && props.lahan === null ? <MyLoader/> : null}
        {props.clicked == 2 &&  null}
        
      </Container>
    </>
  );
}

function mapStatetoProps(state) {
  return {
    petani: state.optionMenu.petani,
    lahan: state.optionMenu.lahan,
    clicked: state.optionMenu.clicked,
  };
}
export default connect(mapStatetoProps)(Welcome);
