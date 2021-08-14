import axios from 'axios';

let asset = document.querySelector('meta[name="asset"]').content;
let csrf = document.querySelector('meta[name="csrf"]').content;


axios.defaults.baseURL = `${asset}api`;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['X-CSRF-Token'] = csrf;


export default axios;