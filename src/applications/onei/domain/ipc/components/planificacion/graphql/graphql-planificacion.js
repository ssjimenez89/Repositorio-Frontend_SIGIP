import gql from 'graphql-tag';

export const GENERAR_PLANIFICACION_MUTATION = gql`mutation($anno: Int!){
  generarPlanificacionFecha(anno: $anno)
}`;


export const QUERY_GENERAR_ANNOS = gql`query($annos:Int!){
  generarAnnos(cantidadAnnosFuturos:$annos)
}`;
