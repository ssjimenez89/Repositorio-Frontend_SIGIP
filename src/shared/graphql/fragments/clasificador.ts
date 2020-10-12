import {currency} from "@shared/graphql/fragments/moneda";
import {weighingType} from "@shared/graphql/fragments/ponderacion";
import gql from 'graphql-tag';

const classifierType = gql`fragment classifierType on ClassifierType{
      id
      description
      codeClassifier
      active
}`;

const varietyType = gql`fragment varietyType on VarietyType{
      id
      description
      active
}`;

const classifierWeighings = gql`fragment classifierWeighings on ClassifierWeighing{
    id
    value
    currency{
     ...currency
    }
    weighingType{
     ...weighingType
    }
  }${currency},${weighingType}`;

const classifierFields = gql`
    fragment classifierFields on Classifier {
      id
      description
      code
      level
      childrens{
          id
          description
          code
          level
           classifierType{
            ...classifierType
      }          
         childrens{
             id
             description
             code
             level
             classifierType{
              ...classifierType
              }          
         }
      }
      parent{
      id
      description
      }
       varietyCharactSpecifics{
        specification{
          id
          description
          characteristic{
            id
            description
          }
        }
      }
      marketCurrencies{
        id
      }
      varietyType{
        id
        description
      }
      classifierType{
        ...classifierType
      }
      classifierWeighings{
        ...classifierWeighings
      }
   }${classifierWeighings},${classifierType}`;

export {classifierWeighings, classifierType, classifierFields}
