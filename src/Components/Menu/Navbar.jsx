import React, { useEffect, useReducer, useState } from "react";
import { Input, InputGroup } from "reactstrap";
import { ActionTypes } from "redux-devtools";
import { ACTIONS, store } from "../../Redux/ReduxController";

export default function MenuBar() {
  const [provinsi, setprovinsi] = useState(null);
  const [kabupaten, setkabupaten] = useState(null);
  const [kecamatan, setkecamatan] = useState(null);
  const [kelurahan, setkelurahan] = useState(null);
  const [dataProvinsi, setdataProvinsi] = useState(null);
  const [dataKabupaten, setdataKabupaten] = useState(null);
  const [dataKecamatan, setdataKecamatan] = useState(null);
  const [dataKelurahan, setdataKelurahan] = useState(null);

  var axios = require("axios")

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://localhost:8000/wilayah/provinsi",
      headers: {
        "APP-KEY": "okYC7opyhD4DTIauhPvMq2Wkvc6bz08t",
        "Content-Type": "application/json",
      }
    };

    axios(config)
      .then(function (response) {
        setdataProvinsi(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://localhost:8000/wilayah/kabupatenkota",
      headers: {
        "APP-KEY": "okYC7opyhD4DTIauhPvMq2Wkvc6bz08t",
        "Content-Type": "application/json",
      },
      data: {
        filter: {
          provinsi: provinsi,
        },
        order: {
          order_by: "id",
          sort: "ASC",
          page: 1,
          limit_page: 100,
        },
      },
    };

    axios(config)
      .then(function (response) {
        setdataKabupaten(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [provinsi]);

  return (
    <div>
      <InputGroup>
        <Input
          type="select"
          id="provinsi"
          onChange={(e) => {
            e.preventDefault();
            setprovinsi(e.target.value);
          }}
        >
          <option value="">Provinsi</option>
          {dataProvinsi === null
            ? null
            : dataProvinsi.map((items, i) => {
                return <option key={i} value={items.provinsi}>{items.nama}</option>;
              })}
        </Input>
        <Input type="select" id="kabupaten">
          <option value="">Kabupaten</option>
          {dataKabupaten === null
            ? null
            : dataKabupaten.map((items, i) => {
                return <option key={i} value="">{items.nama}</option>;
              })}
        </Input>
        <Input type="select" id="kecamatan">
          <option value="">Kecamatan</option>
        </Input>
      </InputGroup>
    </div>
  );
}
