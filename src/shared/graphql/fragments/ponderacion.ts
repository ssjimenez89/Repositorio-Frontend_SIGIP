import gql from "graphql-tag";

const weighingType = gql`fragment weighingType on WeighingType{
    id
    description
    active
}`;

export {weighingType}
