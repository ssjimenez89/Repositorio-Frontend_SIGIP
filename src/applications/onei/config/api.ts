const apiVersion = "v1.0";

const apiConfig = {
    api_url_resource_base: `http://localhost:8201/api/${apiVersion}/`,
    api_url_server: 'http://localhost:8200',
    api_url_jasper_server: 'http://localhost:8080',
    client_id: 'oauth2',
    client_secret: 'oauth2secret',
    grant_type: 'password',
    token_endpoint: '/oauth/token',
    api_graphql: `http://localhost:9000/graphql`
  }
;

export default apiConfig;
