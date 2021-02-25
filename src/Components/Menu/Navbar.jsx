import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, InputGroup } from "reactstrap";
import { getProfile } from "../../Redux/Action/OptionMenuActions";
import {
  getKabupaten,
  getKecamatan,
  getWilayah,
} from "../../Redux/Action/WilayahAction";
import Maps from "../Map/Maps";
import OptionButton from "./Category";
import "./Navbar.css";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_provinsi: null,
      id_kabupaten: null,
      id_kecamatan: null,
      id_kelurahan: null,
    };
  }
  componentDidMount() {
    this.props.dispatch(getWilayah());
    this.props.dispatch(getProfile())
  }
  render() {
    const provinsi = this.props.provinsi;
    const kabupaten = this.props.kabupaten;
    const kecamatan = this.props.kecamatan;
    return (
      <>
        <div className="Navbar">
          <InputGroup>
            <Input
              type="select"
              onChange={(e) => {
                e.preventDefault();
                this.setState({ id_provinsi: e.target.value });
                this.props.dispatch(getKabupaten(e.target.value));
              }}
            >
              <option value={false}>Provinsi</option>
              {provinsi &&
                provinsi.map((items) => {
                  return (
                    <option key={items.id} value={items.provinsi}>
                      {items.nama}
                    </option>
                  );
                })}
            </Input>
            <Input
              type="select"
              onChange={(e) => {
                e.preventDefault();
                this.setState({ id_kabupaten: e.target });
                this.props.dispatch(
                  getKecamatan(this.state.id_provinsi, e.target.value)
                );
              }}
            >
              <option value="">Kabupaten</option>
              {kabupaten !== null &&
                kabupaten.map((items) => {
                  return (
                    <option key={items.id} value={items.kabupatenkota}>
                      {items.nama}
                    </option>
                  );
                })}
            </Input>
            <Input type="select">
              <option value="">Kecamatan</option>
              {kecamatan !== null &&
                kecamatan.map((items) => {
                  return (
                    <option key={items.id} value={items.kabupatenkota}>
                      {items.nama}
                    </option>
                  );
                })}
            </Input>
          </InputGroup>
          <OptionButton />
        </div>
        <div className="map-container">
          <Maps />
        </div>
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
  };
}
export default connect(mapStateToProps)(MenuBar);
