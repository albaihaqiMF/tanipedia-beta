import axios from "axios";
import React, { useEffect, useState } from "react";

export const data = JSON.stringify({
  filter: {
    provinsi: "11",
  },
  order: {
    order_by: "id",
    sort: "ASC",
    page: 1,
    limit_page: 100,
  },
});
export const GetProvinsi = () => {
  const [provinsi, setProvinsi] = useState(null);
  var config = {
    method: "get",
    url: "http://localhost:8000/wilayah/provinsi",
    headers: {
      "APP-KEY": "okYC7opyhD4DTIauhPvMq2Wkvc6bz08t",
    },
  };

  useEffect(() => {
    axios(config)
      .then(function (response) {
        setProvinsi(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [data]);
  return provinsi;
};
