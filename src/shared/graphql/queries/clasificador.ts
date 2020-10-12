import {currency} from "@shared/graphql/fragments/moneda";
import {weighingType} from "@shared/graphql/fragments/ponderacion";
import gql from "graphql-tag";


const varietyCharactSpecifics = gql`fragment varietyCharactSpecifics on VarietyCharactSpecific{
      id
      active
     specification{
         id
         description
         active
         characteristic{
             id
             description
             active
         }
     }
}`;

const varietyType = gql`fragment varietyType on VarietyType{
      id
      description
      active
}`;

const marketCurrencies = gql`fragment marketCurrencies on MarketCurrency{
      id
}`;

const classifierType = gql`fragment classifierType on ClassifierType{
      id
      description
      codeClassifier
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


const classifiers = gql`fragment classifiers on Classifier{
    id
    description
    code
    level
    parent{
      id
    }
     classifierWeighings{
    ...classifierWeighings
    }
    classifierType{
    ...classifierType
    }
    varietyType{
      ...varietyType
    }
    marketCurrencies{
      ...marketCurrencies
    }
    varietyCharactSpecificsActives{
      ...varietyCharactSpecifics
    }
  }${classifierType},${classifierWeighings},${varietyType},${marketCurrencies},${varietyCharactSpecifics}`;

const GET_CLASIFICADOR_QUERY = gql`
query($id: Long){
  classifiers(id:$id){
    ...classifiers
     childrens{
    ...classifiers
       childrens{
       ...classifiers
          childrens{
          ...classifiers
           childrens{
          ...classifiers
           childrens{
            ...classifiers
            }
          }
       }
    }
  }
  },
}${classifiers}`;

const MANAGE_CLASSIFIER_MUTATION = gql`
mutation manageClassifier($input: ClassifierInput ){
  manageClassifier( input:$input){
    ...classifiers
  }
}${classifiers}`;


export {GET_CLASIFICADOR_QUERY, MANAGE_CLASSIFIER_MUTATION};
