<template>
  <div>
    <v-layout row>
      <v-flex md6 sm6 xs6>
<!--        <v-select-->
<!--          @change="mostrar_componente()"-->
<!--          :items="tiposReportes"-->
<!--          item-value="id"-->
<!--          item-text="valor"-->
<!--          label="Reportes"-->
<!--          :attach="true"-->
<!--          v-model="reporte"-->
<!--        ></v-select>-->
        <v-autocomplete
          @change="mostrar_componente()"
          :items="tiposReportes"
          item-value="id"
          item-text="valor"
          label="Reportes"
          :attach="true"
          v-model="reporte"
        ></v-autocomplete>
      </v-flex>
    </v-layout>
    <v-layout row>
      <CantidadPreciosVariedad v-if="formReporte.cantidad_precios_variedad"></CantidadPreciosVariedad>
      <CantidadVariedadesDPA v-if="formReporte.cantidad_variedades_dpa"></CantidadVariedadesDPA>
      <CaptacionesMercadoAgropecuario
        v-if="formReporte.captacion_mercado_agropecuario"></CaptacionesMercadoAgropecuario>
      <EstablecimientosTipologia v-if="formReporte.establecimientos_tipologia"></EstablecimientosTipologia>
      <EstablecimientosVariedad v-if="formReporte.establecimientos_variedad"></EstablecimientosVariedad>
      <EstablecimientoGeneral v-if="formReporte.establecimiento_general"></EstablecimientoGeneral>
      <EstablecimientosDiasCaptar v-if="formReporte.establecimientos_dias_captar"></EstablecimientosDiasCaptar>
      <CantidadEstablecimientosDiasCaptar v-if="formReporte.cantidad_establecimientos_dias_captar"></CantidadEstablecimientosDiasCaptar>
      <PrecioPromedioMercadoAgropecuario
        v-if="formReporte.precio_promedio_mercado_agropecuario"></PrecioPromedioMercadoAgropecuario>
      <BienesServiciosPonderaciones v-if="formReporte.bienes_servicios_ponderaciones"></BienesServiciosPonderaciones>
      <BienesServiciosPorcientos v-if="formReporte.bienes_servicios_porciento"></BienesServiciosPorcientos>
      <FaltasOcasionalesVariedades v-if="formReporte.faltas_ocasionales_variedades"></FaltasOcasionalesVariedades>
      <EstablecimientosDPA v-if="formReporte.establecimientos_dpa"></EstablecimientosDPA>
      <ObservacionesDivisionesMercado
        v-if="formReporte.observaciones_divisiones_mercado"></ObservacionesDivisionesMercado>
      <Incidencias v-if="formReporte.incidencias"></Incidencias>
      <VariedadesEstablecimientoEmpadrono
        v-if="formReporte.variedad_establecimiento_empadrono"></VariedadesEstablecimientoEmpadrono>
      <PreciosImputar v-if="formReporte.precios_imputar"></PreciosImputar>
      <SeriePrecios v-if="formReporte.serie_precios"></SeriePrecios>
      <EstadisticasCaptacion v-if="formReporte.estadisticas_captacion"></EstadisticasCaptacion>
      <Observaciones v-if="formReporte.observaciones"></Observaciones>
      <ResultadosCalculo v-if="formReporte.resultado_calculo"></ResultadosCalculo>
    </v-layout>
  </div>
</template>

<script lang="ts">
  import VBtn from "@vuetify/components/VBtn";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VDialog from "@vuetify/components/VDialog";
  import VForm from "@vuetify/components/VForm";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VIcon from "@vuetify/components/VIcon";
  import VSelect from "@vuetify/components/VSelect";
  import VAutocomplete from "@vuetify/components/VAutocomplete";
  import {} from "./graphql/graphql-reportes.js";
  import {IReporte} from "@/applications/onei/domain/ipc/components/reportes/interfaces/IReporte";
  import CantidadPreciosVariedad from "./CantidadPreciosVariedad";
  import CantidadVariedadesDPA from "./CantidadVariedadesDPA";
  import CaptacionesMercadoAgropecuario from "./CaptacionesMercadoAgropecuario";
  import EstablecimientosTipologia from "./EstablecimientosTipologia";
  import EstablecimientosVariedad from "./EstablecimientosVariedad";
  import EstablecimientoGeneral from "./EstablecimientoGeneral";
  import EstablecimientosDiasCaptar from "./EstablecimientosDiasCaptar";
  import CantidadEstablecimientosDiasCaptar from "./CantidadEstablecimientosDiasCaptar";
  import PrecioPromedioMercadoAgropecuario from "./PrecioPromedioMercadoAgropecuario";
  import BienesServiciosPonderaciones from "./BienesServiciosPonderaciones";
  import BienesServiciosPorcientos from "./BienesServiciosPorcientos";
  import FaltasOcasionalesVariedades from "./FaltasOcasionalesVariedades";
  import EstablecimientosDPA from "./EstablecimientosDPA";
  import ObservacionesDivisionesMercado from "./ObservacionesDivisionesMercado.vue";
  import Incidencias from "./Incidencias";
  import VariedadesEstablecimientoEmpadrono from "./VariedadesEstablecimientoEmpadrono";
  import PreciosImputar from "./PreciosImputar";
  import SeriePrecios from "./SeriePrecios";
  import EstadisticasCaptacion from "./EstadisticasCaptacion";
  import Observaciones from "./Observaciones";
  import ResultadosCalculo from "./ResultadosCalculo";
  import {JasperLogin, RestAPIBase} from "@/applications/onei/config/axios-config";

  export default {
    name: "onei-reporte",
    components: {
      VContainer,
      VLayout,
      VFlex,
      VForm,
      VBtn,
      VIcon,
      VDialog,
      VSelect,
      VAutocomplete,
      CantidadPreciosVariedad,
      CantidadVariedadesDPA,
      CaptacionesMercadoAgropecuario,
      EstablecimientosTipologia,
      EstablecimientosVariedad,
      EstablecimientoGeneral,
      EstablecimientosDiasCaptar,
      CantidadEstablecimientosDiasCaptar,
      PrecioPromedioMercadoAgropecuario,
      BienesServiciosPonderaciones,
      BienesServiciosPorcientos,
      FaltasOcasionalesVariedades,
      EstablecimientosDPA,
      ObservacionesDivisionesMercado,
      Incidencias,
      VariedadesEstablecimientoEmpadrono,
      PreciosImputar,
      SeriePrecios,
      EstadisticasCaptacion,
      Observaciones,
      ResultadosCalculo
    },
    props: {},
    data() {
      const defaultForm: IReporte = {
        cantidad_precios_variedad: false,
        cantidad_variedades_dpa: false,
        captacion_mercado_agropecuario: false,
        establecimientos_tipologia: false,
        establecimientos_variedad: false,
        establecimiento_general: false,
        establecimientos_dias_captar: false,
        cantidad_establecimientos_dias_captar: false,
        precio_promedio_mercado_agropecuario: false,
        bienes_servicios_ponderaciones: false,
        bienes_servicios_porciento: false,
        faltas_ocasionales_variedades: false,
        establecimientos_dpa: false,
        observaciones_divisiones_mercado: false,
        incidencias: false,
        variedad_establecimiento_empadrono: false,
        precios_imputar: false,
        serie_precios: false,
        estadisticas_captacion: false,
        observaciones: false,
        resultado_calculo: false,
      };
      return {
        reporte: null,
        formReporte: Object.assign({}, defaultForm),
        tiposReportes: [
          {id: 1, valor: "Cantidad de precios por variedad"},
          {id: 2, valor: "Cantidad de variedades por DPA"},
          {id: 3, valor: "Captaciones del mercado agropecuario"},
          {id: 4, valor: "Establecimientos por tipología"},
          {id: 5, valor: "Establecimientos por variedad"},
          {id: 6, valor: "Establecimiento general"},
          {id: 7, valor: "Establecimientos por días a captar"},
          {id: 25, valor: "Cantidad de Establecimientos por días a captar"},
          {id: 8, valor: "Precio promedio en el mercado agropecuario"},
          {id: 9, valor: "Bienes y servicios con ponderaciones"},
          {id: 10, valor: "Bienes y servicios con porciento en cup y cuc"},
          {id: 11, valor: "Cantidad de faltas ocasionales por variedades"},
          {id: 12, valor: "Establecimientos por DPA"},
          {id: 13, valor: "Observaciones de las divisiones por mercado"},
          {id: 14, valor: "Incidencias"},
          {id: 15, valor: "Variedad por establecimiento en que se empadronó"},
          {id: 16, valor: "Precios a imputar"},
          {id: 17, valor: "Serie de precios"},
          {id: 18, valor: "Estadísticas sobre la captación"},
          {id: 18, valor: "Estadísticas sobre la captación"},
          {id: 19, valor: "Observaciones"},
          {id: 20, valor: "Resultado del cálculo"},
        ],
      };
    },
    created() {},

    methods: {
      mostrar_componente() {
        switch (this.reporte) {
          case 1:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.cantidad_precios_variedad = true;
            break;
          case 2:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.cantidad_variedades_dpa = true;
            break;
          case 3:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.captacion_mercado_agropecuario = true;
            break;
          case 4:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.establecimientos_tipologia = true;
            break;
          case 5:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.establecimientos_variedad = true;
            break;
          case 6:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.establecimiento_general = true;
            break;
          case 7:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.establecimientos_dias_captar = true;
            break;
          case 8:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.precio_promedio_mercado_agropecuario = true;
            break;
          case 9:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.bienes_servicios_ponderaciones = true;
            break;
          case 10:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.bienes_servicios_porciento = true;
            break;
          case 11:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.faltas_ocasionales_variedades = true;
            break;
          case 12:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.establecimientos_dpa = true;
            break;
          case 13:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.observaciones_divisiones_mercado = true;
            break;
          case 14:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.incidencias = true;
            break;
          case 15:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.variedad_establecimiento_empadrono = true;
            break;
          case 16:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.precios_imputar = true;
            break;
          case 17:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.serie_precios = true;
            break;
          case 18:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.estadisticas_captacion = true;
            break;
          case 19:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.observaciones = true;
            break;
          case 20:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.resultado_calculo = true;
            break;
          case 25:
            this.formReporte = Object.assign({}, this.defaultForm);
            this.formReporte.cantidad_establecimientos_dias_captar = true;
            break;
        }
      }
    },
  }
</script>

<style scoped>
</style>
