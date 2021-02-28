import axios from "axios";
import { OPTION_MENU_ACTIONS } from ".";
import { APP_KEY, BaseUrl } from "../../Components/API";

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
      console.log(res.data.data)
      dispatch({
        type: OPTION_MENU_ACTIONS.LAHAN,
        payload: {
          data: res.data.data,
        },
      });
    });
  };
};

export const optionSelected = (id, Opencard) => {
  return (dispatch) => {
    dispatch({
      type: OPTION_MENU_ACTIONS.DATA_SELECTED,
      payload: {
        data: id,
        cardOpen:Opencard,
      },
    });
  };
};

export const dataOnCard = (data) => {
  return (dispatch) => {
    dispatch({
      type: OPTION_MENU_ACTIONS.CARD,
      payload: {
        data: data,
        cardOpen: true,
      },
    });
  };
};
