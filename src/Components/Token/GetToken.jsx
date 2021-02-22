import React, { useEffect, useState } from "react";

export const GetToken = () => {
  const [token, setToken] = useState(null);
  var axios = require("axios");
  var data = JSON.stringify({
    username: "fahmi",
    password: "fahmi1234sayangnadyacelalu",
  });

  var config = {
    method: "post",
    url: "http://localhost:8000/login",
    headers: {
      "APP-KEY": "okYC7opyhD4DTIauhPvMq2Wkvc6bz08t",
      "Content-Type": "application/json",
    },
    data: data,
  };

  useEffect(() => {
    axios(config)
      .then(function (response) {
        setToken(response.data.data.api_token);
      })
      .catch(function (error) {
        console.log(error);
      });
  },[data]);
  return token;
};
