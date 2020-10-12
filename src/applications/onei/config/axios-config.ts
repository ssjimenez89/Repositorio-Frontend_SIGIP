import apiConfig from '@/applications/onei/config/api.ts';
import {logout} from "@/applications/onei/utils/Oauth2Util.ts";
import {$store} from "@/main";
import axios from 'axios';

axios.defaults.timeout = 30000;

// Axios instances for OAuth2 Login  and interceptors
const Oauth2Login = axios.create({
  auth: {
    password: apiConfig.client_secret,
    username: apiConfig.client_id,
  },
  baseURL: apiConfig.api_url_server,
});

Oauth2Login.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

Oauth2Login.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(responseValidate(error))
);

function responseValidate(error: any) {
  if (!error.response) {
    return "Error en la conexión con el servidor";
  }

  if (error.response.data.error === "invalid_grant") {
    return error.response.data.error_description;
  } else {
    return error.response.data.error;
  }
}

// end of Axios instances for OAuth2 Login  and interceptors

// Axios instances for RestAPIBase and interceptors
const RestAPIBase = axios.create({
  baseURL: apiConfig.api_url_resource_base,
});
RestAPIBase.interceptors.request.use(
  (config) => {
    const token = localStorage.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

RestAPIBase.interceptors.response.use((response) => response, error => {
  if (error.response.status === 401) {
    return $store
      .dispatch("@onei.login/refreshToken")
      .then(data => {
        error.config.headers.Authorization = `Bearer ${data.access_token}`;
        return RestAPIBase.request(error.config)
      })
  } else {
    return Promise.reject(error);
  }
});


// end of Axios instances RestAPIBase and interceptors

// Refresh token axios instance and interceptors
const Oauth2RefreshToken = axios.create({
  auth: {
    password: apiConfig.client_secret,
    username: apiConfig.client_id,
  },
  baseURL: `${apiConfig.api_url_server}${apiConfig.token_endpoint}`,
  params: {
    'grant_type': 'refresh_token'
  },
});
Oauth2RefreshToken.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(responseValidateRefreshToken(error))
);

function responseValidateRefreshToken(error: any) {
  if (!error.response) {
    return "Error en la conexión con el servidor";
  }

  if (error.response.status === 401) {
    logout();
  } else {
    return error.response.data.error;
  }
}

// end of Refresh token axios instance and interceptors

// Axios instances for JasperAPIBase and interceptors
const JasperAPIBase = axios.create({
  baseURL: apiConfig.api_url_jasper_server,
  responseType: 'blob',
});
JasperAPIBase.interceptors.request.use(
  (config) => {

    const jasperBasicToken = $store.getters["@onei.login/jasper"];
    if (jasperBasicToken) {
      config.headers.Authorization = `Basic ${jasperBasicToken}`;
    }
    return config;
  }
);
// end of Axios instances JasperAPIBase and interceptors


export {Oauth2Login, RestAPIBase, Oauth2RefreshToken, JasperAPIBase};
