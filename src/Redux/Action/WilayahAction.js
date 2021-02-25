import axios from "axios";
import { APP_KEY, BaseUrl } from "../../Components/API";
import { WILAYAH_ACTIONS } from ".";

export const getWilayah = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: BaseUrl + "wilayah/provinsi",
      headers: {
        "APP-KEY": APP_KEY,
      },
    }).then((res) => {
      dispatch({
        type: WILAYAH_ACTIONS.GET_PROVINSI,
        payload: {
          data: res.data.data,
        },
      });
    });
  };
};

export const getKabupaten = (id_provinsi = false) => {
  return (dispatch) => {
    var data = JSON.stringify({
      filter: { provinsi: "18" },
      order: { order_by: "id", sort: "ASC", page: 1, limit_page: 100 },
    });

    var config = {
      method: "get",
      url: BaseUrl + "wilayah/kabupatenkota",
      headers: {
        "APP-KEY": APP_KEY,
        "Content-Type": "application/json",
      },
      data: data,
    };

    id_provinsi &&
      axios(config)
        .then(function (response) {
          console.log(id_provinsi);
          dispatch({
            type: WILAYAH_ACTIONS.GET_KABUPATEN,
            payload: {
              data: response.data.data,
            },
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  };
};

export const getKecamatan = (id_provinsi = false, id_kabupaten = false) => {
  return (dispatch) => {
    var data = JSON.stringify({
      filter: { provinsi: id_provinsi, kabupatenkota: id_kabupaten },
      order: { order_by: "id", sort: "ASC", page: 1, limit_page: 100 },
    });

    var config = {
      method: "get",
      url: BaseUrl + "wilayah/kecamatan",
      headers: {
        "APP-KEY": APP_KEY,
        "Content-Type": "application/json",
      },
      data: data,
    };

    id_provinsi &&
      axios(config)
        .then(function (response) {
          console.log(response.data.data);
          dispatch({
            type: WILAYAH_ACTIONS.GET_KECAMATAN,
            payload: {
              data: response.data.data,
            },
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  };
};
