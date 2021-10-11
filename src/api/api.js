import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()
const apiIpAddress ='3.144.154.103:9000';
// const PORT = 3030;
// const DEV = false;

// axios.defaults.withCredentials = true

// let BASE = process.env.REACT_APP_API || 'http://localhost:3030/api'; 
// let BASE = process.env.REACT_APP_API || 'http://localhost:8000/api';
let BASE = `http://${apiIpAddress}/api`;
let HEROKU = 'https://ordr-development.herokuapp.com/api'

if(process.env.REACT_APP_API != null) {
  BASE = process.env.REACT_APP_API
}
// BASE = HEROKU
// const PROD = true;
// if(PROD) {
//     BASE = HEROKU
// }

// let APTIBLE = 'http://app-15462.on-aptible.com/api';


// if(!DEV) {
//     BASE = APTIBLE;
// }

console.log('BASE', BASE)

const http = axios.create({ withCredentials: true, baseURL: BASE, headers: {
    "Cache-Control": "no-cache"
} })


function serialize(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

// http.defaults.withCredentials = true

export { http, BASE, serialize }