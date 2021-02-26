import { WILAYAH_ACTIONS } from "../Action";

const regionState = {
    dataProvinsi:null,
    dataKabupaten:null,
    dataKecamatan:null,
    dataKelurahan:null,
    title:'Region State Management'
};

const wilayah = (state = regionState, action) => {
  switch (action.type) {
    case WILAYAH_ACTIONS.GET_PROVINSI:
      return {
        ...state,
        dataProvinsi:action.payload.data
      }
    case WILAYAH_ACTIONS.GET_KABUPATEN:
      return {
          ...state,
          dataKabupaten:action.payload.data
      }
    case WILAYAH_ACTIONS.GET_KECAMATAN:
      return {
        ...state,
        dataKecamatan:action.payload.data
      }
    case WILAYAH_ACTIONS.GET_KELURAHAN:
      return {
        ...state,
        dataKelurahan:action.payload.data
      }
    default:
      return state;
  }
};

export default wilayah;
