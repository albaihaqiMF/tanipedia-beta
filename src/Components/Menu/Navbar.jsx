import React, { useEffect, useReducer, useState } from "react";
import { GetProvinsi } from "../../Data/GetProvinsi";
import { GetKabupaten } from "../../Data/GetKabupaten";
import { GetKecamatan } from "../../Data/GetKecamatan";
import { GetKelurahan } from "../../Data/GetKelurahan";
import { Input, InputGroup } from "reactstrap";

export default function MenuBar() {
  const [provinsi, setprovinsi] = useState(null);
  const [kabupaten, setkabupaten] = useState(null);
  const [kecamatan, setkecamatan] = useState(null);
  const [kelurahan, setkelurahan] = useState(null);

  const dataProvinsi = GetProvinsi();
  const dataKabupaten = GetKabupaten();
  const filKab =
    dataKabupaten === null && provinsi === null
      ? null
      : dataKabupaten.filter((items) => {
          return items.provinsi == provinsi;
        });

  const dataKecamatan = GetKecamatan();
  const filKec =
    dataKecamatan === null && kabupaten === null
      ? null
      : dataKecamatan.filter((items) => {
          return items.provinsi == provinsi && items.kabupatenkota == kabupaten;
        });
  const dataKelurahan = GetKelurahan(kecamatan);
  const filkel =
    dataKelurahan === null && kecamatan === null
      ? null
      : dataKelurahan.filter((items) => {
          return items.kecamatan == kecamatan;
        });
  if (dataKelurahan === null) {
    return <h1>Loading...</h1>;
  } else {
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
                  return (
                    <option key={i} value={items.provinsi}>
                      {items.nama}
                    </option>
                  );
                })}
          </Input>
          <Input
            type="select"
            id="kabupaten"
            onChange={(e) => {
              e.preventDefault();
              setkabupaten(e.target.value);
            }}
          >
            <option value="">Kabupaten</option>
            {filKab === null
              ? null
              : filKab.map((items, i) => {
                  return (
                    <option key={i} value={items.kabupatenkota}>
                      {items.nama}
                    </option>
                  );
                })}
          </Input>
          <Input type="select" id="kecamatan">
            <option value="">Kecamatan</option>
            {filKec === null
              ? null
              : filKec.map((items, i) => {
                  return (
                    <option key={i} value={items.kecamatan}>
                      {items.nama}
                    </option>
                  );
                })}
          </Input>
          <Input type="select" id="kelurahan">
            <option value="">Kecamatan</option>
            {filkel === null
              ? null
              : filkel.map((items, i) => {
                  return (
                    <option key={i} value={items.kecamatan}>
                      {items.nama}
                    </option>
                  );
                })}
          </Input>
        </InputGroup>
      </div>
    );
  }
}
