import axios from "axios";

export const isProd = process.env.NODE_ENV === "production";

const request = axios.create({
  baseURL:  "http://portal.gmp.dervac.com/api/v1"
});

export const callApi = (url, data = {}, methodName = "get") => {
  const method = methodName.toLowerCase();
  return new Promise((resolve, reject) => {
    const requestConfig = {
      headers: {
        Authorization: "Bearer " + LocalStore.getToken()
      },
      method,
      url
    };
    if (method === "get") {
      requestConfig.params = data;
    } else {
      requestConfig.data = data;
    }
    request(requestConfig)
      .then(res => resolve(res.data))
      .catch(err => {
        if (err.response) {
          // Response from server w/ error
          return reject(err.response.data);
        }
        return reject({
          title: "❌ Network Error",
          message: "Please check your internet connection and try again."
        });
      });
  });
};

export const LocalStore = {
  saveToken(token, key = "gmp_auth_token") {
    return localStorage.setItem(key, token);
  },
  saveUser(data, key = "gmp_user"){
    return localStorage.setItem(key, JSON.stringify(data))
  },
  logUserOut(){
    localStorage.removeItem("gmp_auth_token")
    return localStorage.removeItem("gmp_user")
  },
  getUser(key = "gmp_user"){
    return JSON.parse(localStorage.getItem(key))
  },
  getToken(key = "gmp_auth_token") {
    return localStorage.getItem(key);
  }
};