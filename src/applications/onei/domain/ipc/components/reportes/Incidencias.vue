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
        <autocomplete-variedad-field
          @change="selectVariedad($event)"
        >
        </autocomplete-variedad-field>
      </v-flex>
      <v-flex md4 class="ml-2">
        <v-autocomplete
          :items="lista_tipo_incidencias"
          item-value="id"
          item-text="description"
          label="Tipo de incidencia"
          clearable
          :attach="true"
          v-model="tipo_incidencia"
        ></v-autocomplete>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex md4>
        <date-picker-menu
          clearButton
          label="Fecha Captada"
          v-model="fecha"
        ></date-picker-menu>
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
        <v-select
          :items="usuarios"
          clearable
          item-value="id"
          item-text="usuario"
          label="Usuario que digitó"
          :attach="true"
          v-model="usuario"
        ></v-select>
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
  import {QUERY_DPA_ACTIVAS, QUERY_TIPO_INCIDENCIA, QUERY_MERCADO_MONEDA} from "./graphql/graphql-reportes.js";
  import AutocompleteVariedadField
    from "@shared/components/autocomplete-variedad-field/autocomplete-variedad-field.vue";
  import AutocompleteEstablecimientoFiled
    from "@shared/components/autocomplete-establecimiento-field/autocomplete-establecimiento-filed.vue";
  import DatePickerMenu from "@shared/components/date-picker-menu/date-picker-menu";
  import {downloadFile} from "@/applications/onei/utils/applicationsUtil";
  import {JasperAPIBase, RestAPIBase} from "@/applications/onei/config/axios-config";
  import LoadingDialog from "@shared/components/loading-dialog/loading-dialog.vue";

  export default {
    name: "onei-reporte-incidencias",
    components: {
      AutocompleteEstablecimientoFiled,
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
      LoadingDialog
    },
    props: {},

    data() {
      return {
        dpa: -1,
        variedad: -1,
        tipo_incidencia: -1,
        fecha: null,
        real_fecha: '',
        mercado_moneda: -1,
        usuario: -1,
        usuarios: [],

        filtrodpa: false,
        filtrovariedad: false,
        filtrotipoincidencia: false,
        filtromercadomoneda: false,
        filtrousuario: false,
        filtrofecha: false,
        linear_active: false,
        formatOutput: '.pdf',
        availableFormats: [{label: 'PDF', value: '.pdf'}, {label: 'Excel', value: '.xls'}],
        ruta: '/Reportes_SIGIP/Reportes/Incidencias',
      };
    },
    watch: {
      fecha(val) {
        if (val != null && val != "") {
          this.real_fecha = this.formatDate(val);
          this.filtrofecha = true;
        } else {
          this.filtrofecha = false;
        }
      },
      dpa(val) {
        this.filtrodpa = !!(val != null && val != -1);
      },
      variedad(val) {
        this.filtrovariedad = !!(val != null && val != -1);
      },
      tipo_incidencia(val) {
        this.filtrotipoincidencia = !!(val != null && val != -1);
      },
      mercado_moneda(val) {
        this.filtromercadomoneda = !!(val != null && val != -1);
      },
      usuario(val) {
        this.filtrousuario = !!(val != null && val != -1);
      },
    },
    created() {
      RestAPIBase
        .get("/usuario/all")
        .then(({data}: any) => {
          this.usuarios = data.map(e => {
            return {id: e.idTrabajador, usuario: e.username};
          });
        });
    },

    methods: {
      buscar() {
        if (!this.filtrodpa && !this.filtrovariedad && !this.filtrotipoincidencia &&
          !this.filtromercadomoneda && !this.filtrousuario && !this.filtrofecha) {
          this.$store.dispatch("showMessage", {
            message: "Debe seleccionar un criterio de Búsqueda",
            type: "info"
          })
        } else {
          this.linear_active = true;
          const params =
            '?dpa=' + [this.dpa]
            + '&variedad=' + [this.variedad]
            + '&tipo_incidencia=' + [this.tipo_incidencia]
            + '&mercado_moneda=' + [this.mercado_moneda]
            + '&usuario=' + [this.usuario]
            + '&fecha=' + [this.real_fecha]
            + '&filtrodpa=' + this.filtrodpa
            + '&filtrovariedad=' + this.filtrovariedad
            + '&filtrotipoincidencia=' + this.filtrotipoincidencia
            + '&filtromercadomoneda=' + this.filtromercadomoneda
            + '&filtrousuario=' + this.filtrousuario
            + '&filtrofecha=' + this.filtrofecha
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
      lista_tipo_incidencias: {
        query: QUERY_TIPO_INCIDENCIA,
        update: data => data.incidences,
      },
      lista_mercado_moneda: {
        query: QUERY_MERCADO_MONEDA,
        update: data => data.marketsCurrencies,
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
