const axios = require('axios');
// import store from '../store';
let API = axios.create({
  baseURL: process.env.VUE_APP_API,
});

API.interceptors.request.use(
  req => {
      // for some reason store isn't working
      // if (store.state.access_token) {
      //     req.headers['authorization'] = `Bearer ${store.state.access_token}`;
      if (localStorage.getItem('accessToken')) {
        let access_token = localStorage.getItem('accessToken')
        req.headers['authorization'] = `Bearer ${access_token}`;
      }
      return req;
  },
  error => {
      return error;
  }
);

module.exports = { API };