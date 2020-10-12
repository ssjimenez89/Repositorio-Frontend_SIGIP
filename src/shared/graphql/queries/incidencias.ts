import gql from "graphql-tag";

export const QUERY_GET_INCEDENCES = gql`query{
  incidences{
    id,
    description,
    acronym
  }
}`;

// export QUERY_GET_INCEDENCES
