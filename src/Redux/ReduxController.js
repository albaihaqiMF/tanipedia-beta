const redux = require('redux');
var axios = require('axios');

var BaseURL = 'http://localhost:8000/wilayah/'

var data = JSON.stringify({
    "filter": {
        "provinsi": "36",
        "kabupatenkota": "1"
    },
    "order": {
        "order_by": "kodewilayah",
        "sort": "ASC",
        "page": 1,
        "limit_page": 100
    }
});

const myStore = redux.createStore;
export const ACTIONS = {
    GET_PROVINSI: 'provinsi',
    GET_KABUPATEN: 'kabupatenkota',
    GET_KECAMATAN: 'kecamatan',
    GET_KELURAHAN: 'kelurahan'
}
export const wilayah = {
    provinsi : [],
    kabupatenkota : [],
    kecamatan : [],
    kelurahan : []
}
//Reducer
const myReducer = (state=wilayah, action) => {
    switch (action.type) {
        case ACTIONS.GET_PROVINSI: {
            var config = {
                method: 'get',
                url: BaseURL+ACTIONS.GET_PROVINSI,
                headers: {
                    'APP-KEY': 'okYC7opyhD4DTIauhPvMq2Wkvc6bz08t',
                    'Content-Type': 'application/json'
                },
                data: data
            };
        
            axios(config)
                .then(function (response) {
                    localStorage.setItem('provinsi',response.data.data)
                })
                .catch(function (error) {
                    console.log(error);
                });

            return localStorage.getItem('provinsi')
        }
        case ACTIONS.GET_KABUPATEN:
        case ACTIONS.GET_KECAMATAN:
        case ACTIONS.GET_KELURAHAN:
    }
}

//Create Store
export const store = myStore(myReducer);