const axios = require("axios").default;

axios.defaults.baseURL = "https://localhost:8000/api";
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] = "application/json";
