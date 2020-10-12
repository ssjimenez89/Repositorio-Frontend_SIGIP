import {classifierFields} from "@shared/graphql/fragments/clasificador";
import gql from 'graphql-tag';

export default {
  fragments: {
    children: gql`
      fragment children on Classifier {
      ...classifierFields
       childrens {
          ...classifierFields
          
  }
}${classifierFields}`,
    classifierFields,
  }
}
