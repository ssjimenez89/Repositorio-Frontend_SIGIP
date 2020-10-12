import gql from 'graphql-tag';

const QUERY_GET_TYPOLOGIES = gql`query{
  typologies{
    id
    description
  }
}`;

export {QUERY_GET_TYPOLOGIES};
