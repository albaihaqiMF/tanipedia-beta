import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { data } from './GetProvinsi';

export const GetKecamatan = () => {
    const [kec, setKec] = useState(null);

  var config = {
    method: "get",
    url: "http://localhost:8000/wilayah/kecamatan",
    headers: {
      "APP-KEY": "okYC7opyhD4DTIauhPvMq2Wkvc6bz08t",
    },
  };

  useEffect(() => {
    axios(config)
      .then(function (response) {
        setKec(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [data]);
    return kec === null ? null : kec;
}
