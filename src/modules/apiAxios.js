import axios from 'axios';

// export default function apiAxios(url, callback) {

//     axios(
//         {
//             url: "/api" + url,
//             method: "get",
//             baseURL: "http://localhost:8000",
//             withCredentials: false,
//         }
//     ).then(function (response) {
//         console.log(response);
      
//     });
// }

export default function apiAxios(url, callback) {

    axios(
        {
            url: "/api" + url,
            method: "patch",
            baseURL: "http://localhost:8000",
            headers: {"content-type": "application/json"},
            withCredentials: false,
        }
    ).then(function (response) {
        console.log(response);
      
    });
}

// export default function partUpdateAxios(url, callback) {

//     axios(
//         {
//             url: "/api" + url,
//             method: "patch",
//             baseURL: "http://localhost:8000",
//             withCredentials: false,
//         }
//     ).then(function (response) {
//         console.log(response);
      
//     });
// }