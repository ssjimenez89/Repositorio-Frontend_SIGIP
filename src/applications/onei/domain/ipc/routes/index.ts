import Clasificador from "./clasificador"
import Establecimiento from "./establecimiento"
import Nomenclador from "./nomenclador"
import VariedadEstablecimiento from "./variedadEstablecimiento"
import Variedad from "./variedad"
import Caracteristicas from "./caracteristicas";
import listarcaptaciones from "./listarcaptaciones";
import listarPreciosFueraRango from "./listarPerciosFueraRango"
import Reportes from "./reportes"
import imputarprecio from "./imputarprecio"

import Planificacion from "./planificacion";

const routes = new Array<any>();

const initializeRoutes = () => routes.concat(
  Clasificador,
  Establecimiento,
  Nomenclador,
  VariedadEstablecimiento,
  Variedad,
  Caracteristicas,
  Planificacion,
  Caracteristicas,
  listarcaptaciones,
  listarPreciosFueraRango,
  Reportes,
  imputarprecio
);

export default initializeRoutes
