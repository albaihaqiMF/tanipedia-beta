import { WILAYAH_ACTIONS } from "../Action"

const regionState={

}

const wilayah = (state = regionState, action)=>{
    switch(action.type){
        case WILAYAH_ACTIONS.GET_PROVINSI:
            console.log('provinsi action')
        case WILAYAH_ACTIONS.GET_KABUPATEN:
            console.log('kabupaten action')
        case WILAYAH_ACTIONS.GET_KECAMATAN:
            console.log('kecamatan action')
        case WILAYAH_ACTIONS.GET_KELURAHAN:
            console.log('kelurahan action')
        default:
            return state
    }
}

export default wilayah;