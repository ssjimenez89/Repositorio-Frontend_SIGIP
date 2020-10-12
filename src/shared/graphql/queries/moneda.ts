import gql from 'graphql-tag';

const GET_CURRENCIES_QUERY = gql`
query{
  currencies{
    id
    description
    acronym 
    active
   }
}`;

export {GET_CURRENCIES_QUERY}
