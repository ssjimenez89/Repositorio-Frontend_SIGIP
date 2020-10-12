import {$store} from "@/main";
import {ApolloClient, ApolloLink, from, HttpLink, InMemoryCache, Observable} from "apollo-boost";
import {onError} from "apollo-link-error";
import Vue from "vue";
import VueApollo from "vue-apollo";
import {logout} from "@/applications/onei/utils/Oauth2Util";
import {CacheManager} from "@/core/utils/apollo/cache-manager";
import apiConfig from "@/applications/onei/config/api";

Vue.use(VueApollo);

const httpLink = new HttpLink({
  uri: apiConfig.api_graphql,
});

function getNewToken() {
  return $store
    .dispatch("@onei.login/refreshToken")
    .then((data: { access_token: any; }) => `Bearer ${data.access_token}`)
    .catch((error: any) => error);
}

const error = onError(({graphQLErrors, networkError, operation, forward}: any) => {
  if (networkError) {
    if (networkError.statusCode === 401) {
      if (networkError.result.error_description.includes("Access token expired")) {
        return new Observable(observer => {
          getNewToken()
            .then((token: any) => {
              operation.setContext(({headers = {}}: any) => ({
                headers: {
                  // Re-add old headers
                  ...headers,
                  // Switch out old access token for new one
                  Authorization: `${token}` || null,
                }
              }))
            })
            .then(() => {
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer)
              }

              // Retry last failed request
              forward(operation).subscribe(subscriber)
            })
            .catch((error: any) => {
              observer.error(error)
            })
        })
      } else {
        // logout();
      }
    }
  }
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem('token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // Call the next link in the middleware chain.
  // @ts-ignore
  return forward(operation);
});

const client = new ApolloClient({
  link: from([authLink, error, httpLink]), // Chain it with the HttpLink
  cache: new InMemoryCache(),
  connectToDevTools: true,
});


export const apolloProvider = new VueApollo({
  defaultClient: client,
});

export const cacheManager = new CacheManager(client.cache);
