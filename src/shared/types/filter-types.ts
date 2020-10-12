export class IFilterModel {
  mes: String = '';
  mercado: Number = -1;
  tipologia: Number = -1;
  codigo: String = '';
  dpaId: Number = -1;
  dpaCode: String = '';
  year: String = '';
  estadoVariedad: Number = -1;
  establecimientoId: Number = -1;
  nombre: String = '';
  tipoNomenclador: String = 'Todos';
  variedad: String = '';
  variedadId: Number = -1;
  usuario: Number = -1;
  fecha: String = '';
  precio: Number = -1;
  variacion: Number = -1;
}

export const getFilterModel = () => {
  return new IFilterModel();
};
