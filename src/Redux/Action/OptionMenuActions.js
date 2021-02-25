import axios from "axios"
import { OPTION_MENU_ACTIONS } from "."
import { APP_KEY, BaseUrl } from "../../Components/API"
import { GetToken } from "../../Components/Token/GetToken"

const token = localStorage.getItem('API')

export const getProfile = () => {
    return dispatch =>{
        axios({
            method:'GET',
            url: BaseUrl+'profil',
            headers:{
                'Authorization': `Gradien ${token}`,
                'APP-KEY':APP_KEY
            }
        }).then(res=>{
            dispatch({
                type:OPTION_MENU_ACTIONS.PROFILE,
                payload:{
                    data:res.data.data
                }
            })
        })
    }
}