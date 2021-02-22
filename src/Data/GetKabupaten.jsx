import axios from "axios";
import React, { useEffect, useState } from "react";
import { data } from "./GetProvinsi";

export const GetKabupaten = () => {
  const [kab, setKab] = useState(null);

  var config = {
    method: "get",
    url: "http://localhost:8000/wilayah/kabupatenkota",
    headers: {
      "APP-KEY": "okYC7opyhD4DTIauhPvMq2Wkvc6bz08t",
    },
  };

  useEffect(() => {
    axios(config)
      .then(function (response) {
        setKab(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [data]);

  return kab === null ? null : kab;
};
