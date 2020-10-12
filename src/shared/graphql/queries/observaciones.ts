import gql from "graphql-tag";

export const QUERY_GET_OBSERVACIONES = gql`query{
 observations{
    id,
    description,
    acronym
  }
}`;

export const QUERY_GET_OBSERVACIONES_BY_VARIEDAD = gql`query($varId: Long!){
  observationByVariedad(varId: $varId){
    id,
    description,
    acronym
  }
}`;

