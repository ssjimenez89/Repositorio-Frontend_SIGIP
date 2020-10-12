import gql from 'graphql-tag';

const currency = gql`fragment currency on Currency{
    id
    description
    acronym
}`;

export {currency}
