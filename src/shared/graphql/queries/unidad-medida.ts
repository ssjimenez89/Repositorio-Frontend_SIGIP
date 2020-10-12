import gql from 'graphql-tag';

const QUERY_TIPOS_UNIDAD_MEDIDA = gql`query($tipoUM : Long!) {
  listUMsByTipoUM(tipoUM: $tipoUM){
    id
    description
    active
    measurementUnitType{
      id
    }
  }
}`;


export {QUERY_TIPOS_UNIDAD_MEDIDA};
