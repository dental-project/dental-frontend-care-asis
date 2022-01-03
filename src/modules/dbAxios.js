import axios from 'axios';

export default function loingApi(url, params, callback) {

    console.log(params);
   
    console.log(callback);

    axios(
        {
            url: '/api' + url,
            method: 'post',
            baseURL: 'http://localhost:8080',
            withCredentials: false,
            userid: params.userid,
            password: params.password
        }
    ).then(function (response) {
        callback(response.data);
    });
}