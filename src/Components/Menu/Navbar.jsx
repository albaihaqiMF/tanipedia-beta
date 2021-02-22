import React, { useEffect, useState } from "react";
import Maps from "../Map/Maps";
import { GetProvinsi } from "../../Data/GetProvinsi";
import { GetKabupaten } from "../../Data/GetKabupaten";
import { GetKecamatan } from "../../Data/GetKecamatan";
import { GetKelurahan } from "../../Data/GetKelurahan";
import { Input, InputGroup } from "reactstrap";
import "./Navbar.css";

export default function MenuBar() {
  const [provinsi, setprovinsi] = useState(0);
  const [kabupaten, setkabupaten] = useState(0);
  const [kecamatan, setkecamatan] = useState(0);
  const [kelurahan, setkelurahan] = useState(0);

  const [filter, setfilter] = useState({
    provinsi: 0,
    kabupaten: 0,
    kecamatan: 0,
    kelurahan: 0,
  });

  const dataProvinsi = GetProvinsi();
  const dataKabupaten = GetKabupaten();
  const filKab =
    dataKabupaten === null && provinsi == 0
      ? null
      : dataKabupaten.filter((items) => {
          return items.provinsi == provinsi;
        });

  const dataKecamatan = GetKecamatan();
  const filKec =
    dataKecamatan === null && kabupaten == 0
      ? null
      : dataKecamatan.filter((items) => {
          return items.provinsi == provinsi && items.kabupatenkota == kabupaten;
        });
  const dataKelurahan = GetKelurahan();
  const filKel =
    dataKelurahan === null && kecamatan == 0
      ? null
      : dataKelurahan.filter((items) => {
          return (
            items.provinsi == provinsi &&
            items.kabupatenkota == kabupaten &&
            items.kecamatan == kecamatan
          );
        });
  useEffect(() => {
    console.log(filter);
  }, [filter]);
  if (dataKelurahan === null) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <div className="Navbar">
          <InputGroup>
            <Input
              type="select"
              id="provinsi"
              onChange={(e) => {
                e.preventDefault();
                setprovinsi(e.target.value);
                setfilter({
                  ...filter,
                  provinsi: parseInt(e.target.value),
                });
              }}
            >
              <option value={0}>Provinsi</option>
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
                setfilter({
                  ...filter,
                  kabupaten: parseInt(e.target.value),
                });
              }}
            >
              <option value={0}>Kabupaten</option>
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
            <Input
              type="select"
              id="kecamatan"
              onChange={(e) => {
                e.preventDefault();
                setkecamatan(e.target.value);
                setfilter({
                  ...filter,
                  kecamatan: parseInt(e.target.value),
                });
              }}
            >
              <option value={0}>Kecamatan</option>
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
            <Input
              type="select"
              id="kelurahan"
              onChange={(e) => {
                e.preventDefault();
                setkabupaten(e.target.value);
                setfilter({
                  ...filter,
                  kelurahan: parseInt(e.target.value),
                });
              }}
            >
              <option value={0}>Kelurahan</option>
              {filKel === null
                ? null
                : filKel.map((items, i) => {
                    return (
                      <option key={i} value={items.kecamatan}>
                        {items.nama}
                      </option>
                    );
                  })}
            </Input>
          </InputGroup>
        </div>
        <Maps />
      </>
    );
  }
}
