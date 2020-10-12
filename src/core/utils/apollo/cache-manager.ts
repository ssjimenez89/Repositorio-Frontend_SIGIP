import {InMemoryCache} from "apollo-boost";
import {apolloCache} from "./apollo-cache-invalidate";

export class CacheManager {
  cache: InMemoryCache;
  subscriptions: any = {};

  constructor(cache: any) {
    this.cache = cache;
  }

  /**
   * Invalida una query
   * @param queryName
   * el nombre de la query a invalidar en la cache*/
  invalidateQuery(queryName: string) {
    apolloCache(this.cache).invalidateQuery(queryName);
    this.deleteSubscribesTo(queryName);
  }

  /**
   * Invalida todas las queries que deben ser invalidadas cuando 'queryName' se invalide
   * @param queryName : el nombre de la query a invalidar en la cache
   * */
  private deleteSubscribesTo(queryName: string) {
    const subs = this.subscriptions[queryName] ? this.subscriptions[queryName] : [];
    subs.forEach((s: string) => {
      apolloCache(this.cache).invalidateQuery(queryName);
    });
  }

  deleteFromQuery(queryName: string, id: any) {
    apolloCache(this.cache).deleteFromQuery(queryName, 1);
  }

  /**
   * Invalida 'queryName' cuando 'queryToSubscribe' se invalide.
   * @param queryName : el nombre de la query a invalidar en la cache
   * @param queryToSubscribe: el nombre de la query cuya invalidacion causa la invalidacion de 'queryName'
   * */
  subscribeToInvalidateWhen(queryName: string, queryToSubscribe: string) {
    if (!this.subscriptions[queryName]) {
      this.subscriptions[queryName] = [];
    }
    this.subscriptions[queryName].push(queryToSubscribe);
  }
}
