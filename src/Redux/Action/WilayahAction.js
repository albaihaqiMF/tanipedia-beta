import axios from 'axios'
import { APP_KEY, BaseUrl } from '../../Components/API'
import { WILAYAH_ACTIONS } from '.'

export const getWilayah = () => {
    return (dispatch)=>{
        axios({
            method:'GET',
            url:BaseUrl+'wilayah/provinsi',
            headers:{
                "APP-KEY":APP_KEY
            }
        })
        .then(res=>{
            dispatch({
                type:WILAYAH_ACTIONS.GET_PROVINSI,
                payload:{data:res.data.data}
            })
        })
    }
}
