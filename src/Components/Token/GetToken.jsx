import React, { useEffect } from "react";

export const GetToken = () => {
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
        localStorage.setItem('API',response.data.data.api_token)
        console.log(response.data.data.api_token)
      })
      .catch(function (error) {
        console.log(error);
      });
  },[]);
  const token = localStorage.getItem('API')
  return token;
};
