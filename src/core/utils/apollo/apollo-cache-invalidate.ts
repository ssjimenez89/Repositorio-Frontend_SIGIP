let CACHE: any;

const ROOT = () => {
  return CACHE.ROOT_QUERY;
};
const getObjectFromQuery = (queryName: string) => {

};

const getAllQueriesNamed = (queryName: string): any => {
  return Object.keys(ROOT()).filter(key => {
    return key.startsWith(`${queryName}(`);
  });
};

const getTypeNameOf = (queryName: string) => {
  const a = ROOT()[getAllQueriesNamed(queryName)[0]][0].typename;
  debugger;
  return a;
};
const removeFromROOT = (queryName: string) => {
  const properties = Object.keys(ROOT()).filter(key => {
    return key.startsWith(`${queryName}(`);
  });
  properties.forEach(p => {
    delete CACHE.ROOT_QUERY[p];
  });

};

const deleteAllObjects = (id: string) => {
};

const utils = {
  /**
   * @param queryName:
   * el nombre de la query que se desea eliminar de la cache
   * ej: markets , elimina todas la instancias de markets
   */
  invalidateQuery(queryName: string) {
    if (CACHE && CACHE.ROOT_QUERY) {
      removeFromROOT(queryName);
    }

  },
  deleteFromQuery(queryName: string, id: any) {
    const type = getTypeNameOf(queryName);
    debugger;
  }
};

/**
 * @param cacheObject
 * la cache de apollo:*/
const apolloCache = (cacheObject: any) => {
  CACHE = cacheObject.data.data;
  return {...utils};
};
export {apolloCache}
