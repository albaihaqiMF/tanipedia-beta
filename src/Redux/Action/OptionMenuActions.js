import axios from "axios";
import { OPTION_MENU_ACTIONS } from ".";
import { APP_KEY, BaseUrl } from "../../Components/API";
import { GetToken } from "../../Components/Token/GetToken";

const token = localStorage.getItem("token");

export const getProfile = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: BaseUrl + "profil",
      headers: {
        Authorization: `Gradien ${token}`,
        "APP-KEY": APP_KEY,
      },
    }).then((res) => {
      dispatch({
        type: OPTION_MENU_ACTIONS.PETANI,
        payload: {
          data: res.data.data,
        },
      });
    });
  };
};

export const getLahan = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: BaseUrl + "lahan",
      headers: {
        Authorization: `Gradien ${token}`,
        "APP-KEY": APP_KEY,
      },
    }).then((res) => {
      dispatch({
        type: OPTION_MENU_ACTIONS.LAHAN,
        payload: {
          data: res.data.data,
        },
      });
    });
  };
};

export const optionSelected = (id) =>{
    return (dispatch) => {
        dispatch({
            type:OPTION_MENU_ACTIONS.DATA_SELECTED,
            payload:{
                data:id
            }
        })
    }
}