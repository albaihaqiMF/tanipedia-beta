import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, InputGroup } from "reactstrap";
import { getLahan, getProfile } from "../../Redux/Action/OptionMenuActions";
import {
  getKabupaten,
  getKecamatan,
  getKelurahan,
  getWilayah,
} from "../../Redux/Action/WilayahAction";
import MyLoader from "../Loader";
import Maps from "../Map/Maps";
import OptionButton from "./Category";
import MySearch from "./Search";
import "./Navbar.css";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_provinsi: 0,
      id_kabupaten: 0,
      id_kecamatan: 0,
      id_kelurahan: 0,
    };
  }
  componentDidMount() {
    this.props.dispatch(getWilayah());
    this.props.dispatch(getProfile());
    this.props.dispatch(getLahan());
  }
  render() {
    const provinsi = this.props.provinsi;
    const kabupaten = this.props.kabupaten;
    const kecamatan = this.props.kecamatan;
    const kelurahan = this.props.kelurahan;
    console.log(this.state);
    return (
      <>
        <div className="Navbar">
          <MySearch />
          <div className="Wilayah">
            <Input
              type="select"
              onChange={(e) => {
                e.preventDefault();
                this.setState({
                  id_provinsi: e.target.value,
                  id_kabupaten: 0,
                  id_kecamatan: 0,
                  id_kelurahan: 0,
                });
                this.props.dispatch(getKabupaten(e.target.value));
              }}
              disabled={provinsi == null ? true : false}
            >
              <option value="0">Provinsi</option>
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
              disabled={
                this.state.id_provinsi == 0 || kabupaten == null ? true : false
              }
              onChange={(e) => {
                e.preventDefault();
                this.setState({
                  id_kabupaten: e.target.value,
                  id_kecamatan: 0,
                  id_kelurahan: 0,
                });
                this.props.dispatch(
                  getKecamatan(this.state.id_provinsi, e.target.value)
                );
              }}
            >
              <option value="0">Kabupaten</option>
              {kabupaten !== null &&
                kabupaten.map((items) => {
                  return (
                    <option key={items.id} value={items.kabupatenkota}>
                      {items.nama}
                    </option>
                  );
                })}
            </Input>
            <Input
              type="select"
              disabled={
                this.state.id_kabupaten == 0 || kecamatan == null ? true : false
              }
              onChange={(e) => {
                e.preventDefault();
                this.setState({
                  id_kecamatan: e.target.value,
                  id_kelurahan: 0,
                });
                this.props.dispatch(
                  getKelurahan(
                    this.state.id_provinsi,
                    this.state.id_kabupaten,
                    e.target.value
                  )
                );
              }}
            >
              <option value="0">Kecamatan</option>
              {kecamatan !== null &&
                kecamatan.map((items) => {
                  return (
                    <option key={items.id} value={items.kecamatan}>
                      {items.nama}
                    </option>
                  );
                })}
            </Input>
            <Input
              type="select"
              disabled={
                this.state.id_kecamatan == 0 || kelurahan == null ? true : false
              }
              onChange={(e) => {
                e.preventDefault();
                this.setState({ id_kelurahan: e.target.value });
              }}
            >
              <option value="0">Kelurahan</option>
              {kelurahan &&
                kelurahan.map((items) => {
                  return (
                    <option key={items.id} value={items.kelurahan}>
                      {items.nama}
                    </option>
                  );
                })}
            </Input>
          </div>
          <OptionButton />
        </div>
      </>
    );
  }
}
function mapStateToProps(state) {
  // console.log(state.wilayah.dataKelurahan)
  return {
    provinsi: state.wilayah.dataProvinsi,
    kabupaten: state.wilayah.dataKabupaten,
    kecamatan: state.wilayah.dataKecamatan,
    kelurahan: state.wilayah.dataKelurahan,
  };
}
export default connect(mapStateToProps)(MenuBar);
