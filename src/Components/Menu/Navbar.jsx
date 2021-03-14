import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Container, Input, InputGroup, Row } from "reactstrap";
import {
  getKabupaten,
  getKecamatan,
  getKelurahan,
  getWilayah,
} from "../../Redux/Action/WilayahAction";
import OptionButton from "./Category";
import "./Navbar.css";
import Header from "./../Header";
import {
  getLahan,
  getProfile,
  id_filter,
} from "../../Redux/Action/OptionMenuActions";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_provinsi: 0,
      id_kabupaten: 0,
      id_kecamatan: 0,
      id_kelurahan: 0,
      filterRegion: 0,
    };
  }
  twoDigitHandler(value) {
    if (value < 10) {
      return ("0" + value).toString();
    } else {
      return value.toString();
    }
  }

  fourDigitHandler(value) {
    if (value < 1000) {
      if (value < 100) {
        if (value < 10) {
          return ("000" + value).toString();
        } else {
          return ("00" + value).toString();
        }
      } else {
        return ("0" + value).toString();
      }
    } else {
      return value.toString();
    }
  }

  componentDidMount() {
    this.props.dispatch(getWilayah());
  }
  render() {
    const provinsi = this.props.provinsi;
    const kabupaten = this.props.kabupaten;
    const kecamatan = this.props.kecamatan;
    const kelurahan = this.props.kelurahan;
    const kodeWilayah =
      this.twoDigitHandler(this.state.id_provinsi) +
      "." +
      this.twoDigitHandler(this.state.id_kabupaten) +
      "." +
      this.twoDigitHandler(this.state.id_kecamatan) +
      "." +
      this.fourDigitHandler(this.state.id_kelurahan);
    // console.log(this.state);
    // console.log("kodewilayah : " + kodeWilayah);
    return (
      <>
        <Container fluid className="Navbar">
          <Header />
          <OptionButton />
        </Container>
        {this.state.petani ? null : (
          <div className="Wilayah">
            <Input
              className="input-wilayah"
              type="select"
              onChange={(e) => {
                e.preventDefault();
                this.setState({
                  id_provinsi: parseInt(e.target.value),
                  id_kabupaten: 0,
                  id_kecamatan: 0,
                  id_kelurahan: 0,
                });
                this.props.dispatch(getKabupaten(e.target.value));
                this.props.dispatch(id_filter(e.target.selectedOptions[0].id));
              }}
              disabled={provinsi == null ? true : false}
            >
              <option id="0" value="0">
                Provinsi
              </option>
              {provinsi &&
                provinsi.map((items) => {
                  return (
                    <option
                      key={items.id}
                      id={items.nama}
                      value={items.provinsi}
                    >
                      {items.nama}
                    </option>
                  );
                })}
            </Input>
            <Input
              className="input-wilayah"
              type="select"
              disabled={
                this.state.id_provinsi == 0 || kabupaten == null ? true : false
              }
              onChange={(e) => {
                e.preventDefault();
                this.setState({
                  id_kabupaten: parseInt(e.target.value),
                  id_kecamatan: 0,
                  id_kelurahan: 0,
                });
                this.props.dispatch(
                  getKecamatan(this.state.id_provinsi, e.target.value)
                );
                this.props.dispatch(id_filter(e.target.selectedOptions[0].id));
              }}
            >
              <option id="0" value="0">
                Kabupaten
              </option>
              {kabupaten !== null &&
                kabupaten.map((items) => {
                  return (
                    <option
                      key={items.id}
                      id={items.nama}
                      value={items.kabupatenkota}
                    >
                      {items.nama}
                    </option>
                  );
                })}
            </Input>
            <Input
              className="input-wilayah"
              type="select"
              disabled={
                this.state.id_kabupaten === 0 || kecamatan == null
                  ? true
                  : false
              }
              onChange={(e) => {
                e.preventDefault();
                this.setState({
                  id_kecamatan: parseInt(e.target.value),
                  id_kelurahan: 0,
                });
                this.props.dispatch(
                  getKelurahan(
                    this.state.id_provinsi,
                    this.state.id_kabupaten,
                    e.target.value
                  )
                );
                this.props.dispatch(id_filter(e.target.selectedOptions[0].id));
              }}
            >
              <option id="0" value="0">
                Kecamatan
              </option>
              {kecamatan !== null &&
                kecamatan.map((items) => {
                  return (
                    <option
                      key={items.id}
                      id={items.nama}
                      value={items.kecamatan}
                    >
                      {items.nama}
                    </option>
                  );
                })}
            </Input>
            <Input
              className="input-wilayah"
              type="select"
              disabled={
                this.state.id_kecamatan == 0 || kelurahan === null ? true : false
              }
              onChange={(e) => {
                e.preventDefault();
                this.setState({
                  id_kelurahan: parseInt(e.target.value),
                });
                this.props.dispatch(id_filter(e.target.selectedOptions[0].id));
              }}
            >
              <option id="0" value="0">
                Kelurahan
              </option>
              {kelurahan &&
                kelurahan.map((items) => {
                  return (
                    <option
                      key={items.id}
                      id={items.nama}
                      value={items.kelurahan}
                    >
                      {items.nama}
                    </option>
                  );
                })}
            </Input>
          </div>
        )}
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    provinsi: state.wilayah.dataProvinsi,
    kabupaten: state.wilayah.dataKabupaten,
    kecamatan: state.wilayah.dataKecamatan,
    kelurahan: state.wilayah.dataKelurahan,
    petani: state.optionMenu.petani,
    lahan: state.optionMenu.lahan,
  };
}
export default connect(mapStateToProps)(MenuBar);
