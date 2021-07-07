const axios = require('axios');

let API = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  timeout: 1000
});

module.exports = { API };