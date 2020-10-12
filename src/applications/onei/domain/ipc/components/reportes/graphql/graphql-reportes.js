import gql from 'graphql-tag';

export const QUERY_DPA_ACTIVAS = gql`
query{
  dpas{
      id
      code
      description
      }
  }`;

export const QUERY_PLANIFICACION = gql`
query{
  plannings{
      id
      day
      }
  }`;

export const QUERY_TIPO_TIPOLOGIAS = gql`
query{
  categories{
      id
      description
      }
  }`;

export const QUERY_TIPOLOGIAS = gql`
query{
  typologies{
      id
      description
      }
  }`;

export const QUERY_MERCADO_MONEDA = gql`
query{
  marketsCurrencies{
      id
      description
      }
  }`;

export const QUERY_TIPO_INCIDENCIA = gql`
query{
  incidences{
      id
      description
      }
  }`;

export const QUERY_NIVEL_AGREGACION = gql`
query{
  classifierTypes{
      id
      description
      }
  }`;

export const QUERY_ARTICULOS_FILTRADOS = gql`query($descripcion: String!,$page: Int!, $size: Int!){
  articulosFiltrados(descripcion:$descripcion,page:$page,size:$size){
    id,
    description,
  }
}`;

export const QUERY_OBSERVACIONES = gql`
query{
  observations{
      id
      description
      }
  }`;

export const QUERY_TIPO_VARIEDAD = gql`
query{
  varietyTypes{
      id
      description
      }
  }`;
