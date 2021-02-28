import './App.css';
import Routes from './Routes';
import { useEffect } from 'react';
import axios from 'axios';
import { APP_KEY, BaseUrl } from './Components/API';

function App() {
  useEffect(()=>{
    axios({
      method:'post',
      url:BaseUrl+'login',
      headers:{
        'APP-KEY':APP_KEY
      },
      data:{
        username :'fahmi',
        password:'fahmi1234sayangnadyacelalu'
      }
    }).then(res=>{
      localStorage.setItem('token',res.data.data.api_token)
    }).catch(err=>console.log(err))
  },[BaseUrl])
  return (
    <Routes/>
  );
}

export default App;
