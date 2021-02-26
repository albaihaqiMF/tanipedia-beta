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

export const getKabupaten = (id_provinsi = null) => {
  return (dispatch) => {
    var config = {
      method: "get",
      url: BaseUrl + `wilayah/kabupatenkota?provinsi=${id_provinsi}`,
      headers: {
        "APP-KEY": APP_KEY,
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
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

export const getKecamatan = (id_provinsi = null, id_kabupaten = null) => {
  return (dispatch) => {
    var config = {
      method: "get",
      url:
        BaseUrl +
        `wilayah/kecamatan?provinsi=${id_provinsi}&kabupatenkota=${id_kabupaten}`,
      headers: {
        "APP-KEY": APP_KEY,
        "Content-Type": "application/json",
      },
    };

    id_provinsi &&
      axios(config)
        .then(function (response) {
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

export const getKelurahan = (
  id_provinsi = null,
  id_kabupaten = null,
  id_kecamatan = null
) => {
  return (dispatch) => {
      axios({
        method: "get",
        url:
          BaseUrl +
          `wilayah/kelurahan?provinsi=${id_provinsi}&kabupatenkota=${id_kabupaten}&kecamatan=${id_kecamatan}`,
        headers: {
          "APP-KEY": APP_KEY,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.data)
        dispatch({
          type: WILAYAH_ACTIONS.GET_KELURAHAN,
          payload: {
            data: res.data.data,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};
