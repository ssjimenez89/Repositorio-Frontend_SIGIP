import gql from 'graphql-tag';

export const MANAGE_CLASSIFIER_MUTATION = gql`
mutation manageClassifier($input: ClassifierInput ){
  manageClassifier( input:$input){
    id
    description
    level
    code
      parent{
        id
        description
      }
  }
}
`;
