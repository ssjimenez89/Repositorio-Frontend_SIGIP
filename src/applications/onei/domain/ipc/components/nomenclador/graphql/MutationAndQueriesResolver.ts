// @ts-ignore
// @ts-ignore
import {
  EDIT_CARGO_MUTATION,
  EDIT_REGION_MUTATION,
  EDIT_CATEGORY_MUTATION,
  EDIT_CLASSIFIERTYPE_MUTATION,
  EDIT_CURRENCY_MUTATION,
  EDIT_DPA_MUTATION,
  EDIT_INCIDENCE_MUTATION,
  EDIT_MARKET_MUTATION,
  EDIT_MEASUREMENTUNITTYPE_MUTATION,
  EDIT_OBSERVATION_MUTATION,
  EDIT_TYPOLOGY_MUTATION,
  EDIT_VARIETYTYPE_MUTATION,
  CARGO_BY_ID,
  REGION_BY_ID,
  CATEGORY_BY_ID,
  CLASSIFIERTYPE_BY_ID,
  CURRENCY_BY_ID,
  DPA_BY_ID,
  INCIDENCE_BY_ID,
  MARKET_BY_ID,
  MEASUREMENTUNITTYPE_BY_ID,
  OBSERVATION_BY_ID,
  TYPOLOGY_BY_ID,
  VARIETYTYPE_BY_ID,
  WEIGHINGTYPE_BY_ID
  // @ts-ignore
} from "./graphql-nomenclador.js";

const resolve = (type: any, obj: any = {}, to = 'q',) => {
  let defaultVars: any = {
    description: obj.nombre,
    active: obj.activo || false,
    id: obj.id
  };
  let dataVar = '';
  let resolve: any = {};
  switch (type) {
    case  'dpa': {
      dataVar = 'dpaById';
      defaultVars.code = obj.code;
      defaultVars.regionId = obj.regionId;
      resolve = {
        query: DPA_BY_ID,
        mutation: EDIT_DPA_MUTATION,
      };
      break;
    }
    case  'observacion': {
      dataVar = 'observationById';
      defaultVars.acronym = obj.acronym;
      resolve = {
        query: OBSERVATION_BY_ID,
        mutation: EDIT_OBSERVATION_MUTATION,
      };
      break;
    }
    case  'incidencia': {
      dataVar = 'incidenceById';
      defaultVars.acronym = obj.acronym;
      resolve = {
        query: INCIDENCE_BY_ID,
        mutation: EDIT_INCIDENCE_MUTATION,
      };
      break;
    }
    case  'moneda': {
      dataVar = 'currencyById';
      defaultVars.acronym = obj.acronym;
      resolve = {
        query: CURRENCY_BY_ID,
        mutation: EDIT_CURRENCY_MUTATION,
      };
      break;
    }
    case  'mercado': {
      dataVar = 'marketById';
      resolve = {
        query: MARKET_BY_ID,
        mutation: EDIT_MARKET_MUTATION,
      };
      break;
    }
    case  'tipo_clasificador': {
      dataVar = 'classifierTypeById';
      defaultVars.codeClassifier = obj.code;
      resolve = {
        query: CLASSIFIERTYPE_BY_ID,
        mutation: EDIT_CLASSIFIERTYPE_MUTATION,
      };
      break;
    }
    case  'tipologia': {
      dataVar = 'typologyById';
      defaultVars.imputed = obj.imputed;
      defaultVars.categoryId = obj.categoryId;
      resolve = {
        query: TYPOLOGY_BY_ID,
        mutation: EDIT_TYPOLOGY_MUTATION,
      };
      break;
    }
    case 'tipo_ponderacion':
    case  'tipo_unidad_medida': {
      dataVar = 'measurementUnitTypeById';
      debugger;
      resolve = {
        query: MEASUREMENTUNITTYPE_BY_ID,
        mutation: EDIT_MEASUREMENTUNITTYPE_MUTATION,
      };
      break;
    }
    case  'tipo_variedad': {
      dataVar = 'varietyTypeById';
      resolve = {
        query: VARIETYTYPE_BY_ID,
        mutation: EDIT_VARIETYTYPE_MUTATION,
      };
      break;
    }
    case  'categoria': {
      dataVar = 'categoryById';

      resolve = {
        query: CATEGORY_BY_ID,
        mutation: EDIT_CATEGORY_MUTATION,
      };
      break;
    }
    case 'cargo': {
      defaultVars.descripcion = obj.nombre;
      defaultVars.activo = obj.activo;
      dataVar = 'cargoById';
      resolve = {
        query: CARGO_BY_ID,
        mutation: EDIT_CARGO_MUTATION
      };
      break;
    }
    case 'region': {
      defaultVars.descripcion = obj.nombre;
      defaultVars.activo = obj.activo;
      dataVar = 'regionById';
      resolve = {
        query: REGION_BY_ID,
        mutation: EDIT_REGION_MUTATION
      };
      break;
    }
  }
  if (to === 'q') {
    return {
      query: {
        query: resolve.query,
        variables: {
          id: obj.id
        }
      },
      data: dataVar
    }
  } else {
    debugger;
    return {
      mutation: resolve.mutation,
      variables: defaultVars
    }
  }

};
const resolveQuery = (type: any, id: any) => {
  return resolve(type, {id: id});
};
const resolveMutation = (type: any, obj: any) => {
  return resolve(type, obj, 'm');
};

export {resolveMutation, resolveQuery};
