import axios from "axios";
import React, { useEffect, useState } from "react";
import { data } from "./GetProvinsi";

export const GetKelurahan = () => {
  const [kelurahan, setKelurahan] = useState(null);

  var config = {
    method: "get",
    url: "http://localhost:8000/wilayah/kelurahan",
    headers: {
      "APP-KEY": "okYC7opyhD4DTIauhPvMq2Wkvc6bz08t",
    },
    data: {
      order: { order_by: "kodewilayah", sort: "ASC", page: 1, limit_page: 100 },
    },
  };

  useEffect(() => {
    axios(config)
      .then(function (response) {
        setKelurahan(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [data]);

  return kelurahan === null ? null : kelurahan;
};
