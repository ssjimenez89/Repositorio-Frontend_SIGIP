<template>
  <div id="content">
    <loading-dialog v-model="linear_active" message="Cargando el reporte"></loading-dialog>
    <v-layout>
      <v-flex md4>
        <v-autocomplete
          :items="lista_dpa"
          item-value="id"
          item-text="completo"
          label="Dpa"
          clearable
          :attach="true"
          v-model="dpa"
        ></v-autocomplete>
      </v-flex>
      <v-flex md4 class="ml-2">
        <v-autocomplete
          :items="lista_tipo_variedad"
          item-value="id"
          item-text="description"
          label="Tipo de variedad"
          clearable
          :attach="true"
          v-model="tipo_variedad"
        ></v-autocomplete>
      </v-flex>
      <v-flex md4 class="ml-2">
        <autocomplete-variedad-field
          @change="selectVariedad($event)"
        >
        </autocomplete-variedad-field>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex md4>
        <v-select
          :items="lista_observaciones"
          clearable
          item-value="id"
          item-text="description"
          label="Tipo de Observaciones"
          :attach="true"
          v-model="observaciones"
        ></v-select>
      </v-flex>
      <v-flex md4 class="ml-2">
        <v-autocomplete
          :items="lista_mercado_moneda"
          item-value="id"
          item-text="description"
          label="Mercado"
          clearable
          :attach="true"
          v-model="mercado_moneda"
        ></v-autocomplete>
      </v-flex>
      <v-flex md4 class="ml-2">
        <v-autocomplete
          :items="lista_planificacion"
          item-value="id"
          item-text="day"
          label="Dia de captación"
          clearable
          :attach="true"
          v-model="dias_captar"
        ></v-autocomplete>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex md4>
        <date-picker-menu
          clearButton
          label="Fecha Captada"
          v-model="fecha_captada"
        ></date-picker-menu>
      </v-flex>
      <v-flex md4 class="ml-2">
        <v-select
          :items="lista_temp_usuarios"
          clearable
          item-value="id"
          item-text="valor"
          label="Usuario que digitó"
          :attach="true"
          v-model="usuario"
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex md5>
        <v-radio-group v-model="formatOutput" :mandatory="true" row>
          <v-radio
            :label=this.availableFormats[1].label
            :value=this.availableFormats[1].value
          ></v-radio>
          <v-radio
            :label=this.availableFormats[0].label
            :value=this.availableFormats[0].value
          ></v-radio>
        </v-radio-group>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex md3>
        <v-btn
          :loading="linear_active"
          @click="buscar()"
          color="primary"
          type="submit"
          append-icon="search"
        >
          <v-icon>search</v-icon>
          Exportar
        </v-btn>
      </v-flex>
    </v-layout>
  </div>

</template>

<script lang="ts">
  import VBtn from "@vuetify/components/VBtn";
  import VDialog from "@vuetify/components/VDialog";
  import VForm from "@vuetify/components/VForm";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VIcon from "@vuetify/components/VIcon";
  import VAutocomplete from "@vuetify/components/VAutocomplete";
  import VSelect from "@vuetify/components/VSelect";
  import {VRadioGroup, VRadio} from "@vuetify/components/VRadioGroup";
  import {
    QUERY_DPA_ACTIVAS,
    QUERY_TIPO_INCIDENCIA,
    QUERY_MERCADO_MONEDA,
    QUERY_OBSERVACIONES,
    QUERY_PLANIFICACION,
    QUERY_TIPO_VARIEDAD
  } from "./graphql/graphql-reportes.js";
  import AutocompleteVariedadField
    from "@shared/components/autocomplete-variedad-field/autocomplete-variedad-field.vue";
  import DatePickerMenu from "@shared/components/date-picker-menu/date-picker-menu";
  import {JasperAPIBase} from "@/applications/onei/config/axios-config";
  import {downloadFile} from "@/applications/onei/utils/applicationsUtil";
  import LoadingDialog from "@shared/components/loading-dialog/loading-dialog.vue";

  export default {
    name: "onei-reporte-observaciones",
    components: {
      AutocompleteVariedadField,
      VLayout,
      VFlex,
      VForm,
      VBtn,
      VIcon,
      VDialog,
      VAutocomplete,
      DatePickerMenu,
      VSelect,
      VRadioGroup,
      VRadio,
      LoadingDialog
    },
    props: {},

    data() {
      return {
        dpa: -1,
        variedad: -1,
        tipo_variedad: -1,
        fecha_captada: null,
        real_fecha: "",
        mercado_moneda: -1,
        usuario: -1,
        observaciones: -1,
        dias_captar: -1,

        filtrodpa: false,
        filtrovariedad: false,
        filtrotipovariedad: false,
        filtromercado: false,
        filtrousuario: false,
        filtroobservaciones: false,
        filtrodiascaptar: false,
        filtrofechacaptada: false,
        linear_active: false,
        formatOutput: '.xls',
        availableFormats: [{label: 'PDF', value: '.pdf'}, {label: 'Excel', value: '.xls'}],
        ruta: '/Reportes_SIGIP/Reportes/Reporte_Estadísticas_sobre_la_captación',
        lista_temp_usuarios: [
          {id: 1, valor: "Usuarioz"},
          {id: 2, valor: "Manolo",},
          {id: 3, valor: "Pedro",},
        ],
      };
    },
    watch: {
      fecha_captada(val) {
        if (val != null && val != "") {
          this.real_fecha = this.formatDate(val);
          this.filtrofechacaptada = true;
        } else {
          this.filtrofechacaptada = false;
        }
      },
      dpa(val) {
        this.filtrodpa = !!(val != null && val != -1);
      },
      variedad(val) {
        this.filtrovariedad = !!(val != null && val != -1);
      },
      tipo_variedad(val) {
        this.filtrotipovariedad = !!(val != null && val != -1);
      },
      mercado_moneda(val) {
        this.filtromercado = !!(val != null && val != -1);
      },
      usuario(val) {
        this.filtrousuario = !!(val != null && val != -1);
      },
      observaciones(val) {
        this.filtroobservaciones = !!(val != null && val != -1);
      },
      dias_captar(val) {
        this.filtrodiascaptar = !!(val != null && val != -1);
      },
    },

    methods: {
      buscar() {
        if (!this.filtrodpa && !this.filtrovariedad && !this.filtrotipovariedad &&
          !this.filtromercado && !this.filtrousuario && !this.filtroobservaciones && !this.filtrodiascaptar && !this.filtrofechacaptada) {
          this.$store.dispatch("showMessage", {
            message: "Debe seleccionar un criterio de Búsqueda",
            type: "info"
          })
        } else {
          this.linear_active = true;
          const params =
            '?dpa=' + [this.dpa]
            + '&variedad=' + [this.variedad]
            + '&tipo_variedad=' + [this.tipo_variedad]
            + '&mercado_moneda=' + [this.mercado_moneda]
            + '&usuario=' + [this.usuario]
            + '&observaciones=' + [this.observaciones]
            + '&dias_captar=' + [this.dias_captar]
            + '&fechacaptada=' + [this.real_fecha]
            + '&filtrodpa=' + this.filtrodpa
            + '&filtrovariedad=' + this.filtrovariedad
            + '&filtrotipovariedad=' + this.filtrotipovariedad
            + '&filtromercado=' + this.filtromercado
            + '&filtrousuario=' + this.filtrousuario
            + '&filtroobservaciones=' + this.filtroobservaciones
            + '&filtrodiascaptar=' + this.filtrodiascaptar
            + '&filtrofechacaptada=' + this.filtrofechacaptada
          JasperAPIBase
            .get("/jasperserver/rest_v2/reports" + this.ruta + this.formatOutput + params)
            .then(({data}: any) => {
              this.linear_active = false;
              const fileName = `${this.ruta.split("/")[3] + this.formatOutput}`;
              downloadFile(data, fileName);
              this.$store.dispatch("showMessage", {
                message: "El reporte se ha generado",
                type: "success"
              })
            })
            .catch(err => {
              this.linear_active = false;
                this.$store.dispatch("showMessage", {
                  message: "No se pudo generar el reporte",
                  type: "error"
                })
              }
            );
        }
      },
      selectVariedad($event) {
        if ($event != null) {
          this.variedad = $event.id;
        } else {
          this.variedad = null;
        }
      },
      formatDate(date) {
        if (date != "") {
          const [day, month, year] = date.split('-');
          return `${year}-${month}-${day}`;
        } else {
          return "";
        }
      },
    },

    apollo: {
      lista_dpa: {
        query: QUERY_DPA_ACTIVAS,
        update: (data) => {
          return data.dpas.map(e => {
            return {...e, completo: e.code.concat("-").concat(e.description)}
          });
        },
      },
      lista_mercado_moneda: {
        query: QUERY_MERCADO_MONEDA,
        update: data => data.marketsCurrencies,
      },
      lista_observaciones: {
        query: QUERY_OBSERVACIONES,
        update: data => data.observations,
      },
      lista_planificacion: {
        query: QUERY_PLANIFICACION,
        update: data => data.plannings,
      },
      lista_tipo_variedad: {
        query: QUERY_TIPO_VARIEDAD,
        update: data => data.varietyTypes,
      },
    },
  }
</script>

<style scoped lang="stylus">
  #content
    width 100%
    position relative

    #menu
      ul
        list-style none

        li
          a:hover
            background rgba(0, 0, 0, 0.04)
      width 100%
      position absolute
      top 48px
      left 0
      z-index 2

</style>
