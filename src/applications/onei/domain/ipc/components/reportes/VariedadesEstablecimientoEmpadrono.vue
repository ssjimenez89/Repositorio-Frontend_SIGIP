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
        <date-picker-menu
          clearButton
          label="Fecha empadronó"
          v-model="fecha"
        ></date-picker-menu>
      </v-flex>
      <v-flex md4 class="ml-2">
        <v-autocomplete
          :items="lista_tipologia"
          item-value="id"
          item-text="description"
          label="Categoría de la tipología"
          clearable
          :attach="true"
          v-model="tipologia"
        ></v-autocomplete>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex md4>
        <autocomplete-establecimiento-filed
          @change="selectEstablecimiento($event)"
        ></autocomplete-establecimiento-filed>
      </v-flex>
      <v-flex md4 class="ml-2">
        <autocomplete-variedad-field
          @change="selectVariedad($event)"
        >
        </autocomplete-variedad-field>
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
  import VBtn from "@vuetify/components/VBtn/index";
  import VDialog from "@vuetify/components/VDialog/index";
  import VForm from "@vuetify/components/VForm/index";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VIcon from "@vuetify/components/VIcon/index";
  import VAutocomplete from "@vuetify/components/VAutocomplete/index";
  import {VRadioGroup, VRadio} from "@vuetify/components/VRadioGroup";
  import {QUERY_DPA_ACTIVAS, QUERY_TIPOLOGIAS} from "./graphql/graphql-reportes.js";
  import AutocompleteVariedadField
    from "@shared/components/autocomplete-variedad-field/autocomplete-variedad-field.vue";
  import AutocompleteEstablecimientoFiled
    from "@shared/components/autocomplete-establecimiento-field/autocomplete-establecimiento-filed.vue";
  import DatePickerMenu from "@shared/components/date-picker-menu/date-picker-menu";
  import {downloadFile} from "@/applications/onei/utils/applicationsUtil";
  import {JasperAPIBase} from "@/applications/onei/config/axios-config";
  import LoadingDialog from "@shared/components/loading-dialog/loading-dialog.vue";

  export default {
    name: "onei-reporte-variedades-establecimiento-empadrono",
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
      VRadioGroup,
      VRadio,
      LoadingDialog
    },
    props: {},

    data() {
      return {
        dpa: -1,
        establecimiento: -1,
        variedad: -1,
        fecha: null,
        real_fecha: '',
        tipologia: -1,

        filtrodpa: false,
        filtrovariedad: false,
        filtroestablecimiento: false,
        filtrotipologia: false,
        filtrofecha: false,
        linear_active: false,
        formatOutput: '.xls',
        availableFormats: [{label: 'PDF', value: '.pdf'}, {label: 'Excel', value: '.xls'}],
        ruta: '/Reportes_SIGIP/Reportes/VariedadesEstablecimientoEmpadrono',
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
      establecimiento(val) {
        this.filtroestablecimiento = !!(val != null && val != -1);
      },
      tipologia(val) {
        this.filtrotipologia = !!(val != null && val != -1);
      },
    },

    methods: {
      buscar() {
        if (!this.filtrodpa && !this.filtrovariedad && !this.filtroestablecimiento && !this.filtrotipologia && !this.filtrofecha) {
          this.$store.dispatch("showMessage", {
            message: "Debe seleccionar un criterio de Búsqueda",
            type: "info"
          })
        } else {
          this.linear_active = true;
          const params =
            '?dpa=' + [this.dpa]
            + '&variedad=' + [this.variedad]
            + '&establecimiento=' + [this.establecimiento]
            + '&tipologia=' + [this.tipologia]
            + '&fecha=' + [this.real_fecha]
            + '&filtrodpa=' + this.filtrodpa
            + '&filtrovariedad=' + this.filtrovariedad
            + '&filtroestablecimiento=' + this.filtroestablecimiento
            + '&filtrotipologia=' + this.filtrotipologia
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
      selectEstablecimiento($event) {
        if ($event != null) {
          this.establecimiento = $event.id;
        } else {
          this.establecimiento = null;
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
      lista_tipologia: {
        query: QUERY_TIPOLOGIAS,
        update: data => data.typologies,
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
