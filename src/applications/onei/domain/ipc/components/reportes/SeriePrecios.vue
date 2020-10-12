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
        <v-menu
          ref="menuPro"
          v-model="menu"
          :close-on-content-click="true"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{on}">
            <v-text-field
              v-model="fieldDate"
              label="Año-Mes"
              prepend-icon="event"
              readonly
              v-on="on"
            >
            </v-text-field>
          </template>
          <v-date-picker
            locale="es-ES"
            type="month"
            ref="pickerPro"
            v-model="pickerDate"
            @input="menu = false"
            :max="max"
            :no-title="true"
            :show-current="false"
            color="primary"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary"
                   small
                   outline
                   @click="clear"
            >Limpiar
            </v-btn>
          </v-date-picker>
        </v-menu>
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
    </v-layout>
    <v-layout>
      <v-flex md4>
        <autocomplete-establecimiento-filed
          @change="selectEstablecimiento($event)"
        ></autocomplete-establecimiento-filed>
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
  import VMenu from "@vuetify/components/VMenu/VMenu";
  import VTextField from "@vuetify/components/VTextField";
  import VForm from "@vuetify/components/VForm/index";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VIcon from "@vuetify/components/VIcon/index";
  import VAutocomplete from "@vuetify/components/VAutocomplete/index";
  import {VRadioGroup, VRadio} from "@vuetify/components/VRadioGroup";
  import {QUERY_DPA_ACTIVAS, QUERY_MERCADO_MONEDA, QUERY_TIPO_VARIEDAD} from "./graphql/graphql-reportes.js";
  import AutocompleteVariedadField
    from "@shared/components/autocomplete-variedad-field/autocomplete-variedad-field.vue";
  import AutocompleteEstablecimientoFiled
    from "@shared/components/autocomplete-establecimiento-field/autocomplete-establecimiento-filed.vue";
  import VDatePicker from "@vuetify/components/VDatePicker/VDatePicker";
  import MonthPickerMenu from "@shared/components/month-picker-menu/month-picker-menu";
  import {JasperAPIBase} from "@/applications/onei/config/axios-config";
  import {downloadFile} from "@/applications/onei/utils/applicationsUtil";
  import LoadingDialog from "@shared/components/loading-dialog/loading-dialog.vue";

  export default {
    name: "onei-reporte-serie-precios",
    components: {
      AutocompleteEstablecimientoFiled,
      AutocompleteVariedadField,
      VLayout,
      VFlex,
      VMenu,
      VForm,
      VBtn,
      VIcon,
      VDialog,
      VAutocomplete,
      VDatePicker,
      MonthPickerMenu,
      VTextField,
      VSpacer,
      VRadioGroup,
      VRadio,
      LoadingDialog
    },
    props: {},

    data() {
      return {
        pickerDate: '',
        fieldDate: '',
        max: new Date().toISOString().substr(0, 10),
        menu: false,

        dpa: -1,
        valor_mes: -1,
        valor_anno: -1,
        mercado_moneda: -1,
        establecimiento: -1,
        variedad: -1,
        tipo_variedad: -1,

        filtrodpa: false,
        filtroannomes: false,
        filtromercadomoneda: false,
        filtroestablecimiento: false,
        filtrotipovariedad: false,
        filtrovariedad: false,
        linear_active: false,
        formatOutput: '.xls',
        availableFormats: [{label: 'PDF', value: '.pdf'}, {label: 'Excel', value: '.xls'}],
        ruta: '/Reportes_SIGIP/Reportes/Serie_Precios',
      };
    },
    watch: {
      pickerDate(val) {
        this.fieldDate = this.pickerDate;
        if (val != "") {
          this.filtroannomes = true;
          const [year, month] = this.fieldDate.split('-');
          this.valor_mes = `${month}`;
          this.valor_anno = `${year}`;
        }
      },
      dpa(val) {
        this.filtrodpa = !!(val != null && val != -1);
      },
      mercado_moneda(val) {
        this.filtromercadomoneda = !!(val != null && val != -1);
      },
      tipo_variedad(val) {
        this.filtrotipovariedad = !!(val != null && val != -1);
      },
      establecimiento(val) {
        this.filtroestablecimiento = !!(val != null && val != -1);
      },
      variedad(val) {
        this.filtrovariedad = !!(val != null && val != -1);
      }
    },

    methods: {
      buscar() {
        if (!this.filtrodpa && !this.filtroestablecimiento && !this.filtrovariedad &&
          !this.filtromercadomoneda && !this.filtrotipovariedad && !this.filtroannomes) {
          this.$store.dispatch("showMessage", {
            message: "Debe seleccionar un criterio de Búsqueda",
            type: "info"
          })
        } else {
          this.linear_active = true;
          const params =
            '?dpa=' + [this.dpa]
            + '&establecimiento=' + [this.establecimiento]
            + '&variedad=' + [this.variedad]
            + '&mercadomoneda=' + [this.mercado_moneda]
            + '&tipovariedad=' + [this.tipo_variedad]
            + '&mes=' + [this.valor_mes]
            + '&anno=' + [this.valor_anno]
            + '&filtrodpa=' + this.filtrodpa
            + '&filtroestablecimiento=' + this.filtroestablecimiento
            + '&filtrovariedad=' + this.filtrovariedad
            + '&filtromercadomoneda=' + this.filtromercadomoneda
            + '&filtrotipovariedad=' + this.filtrotipovariedad
            + '&filtroanno=' + this.filtroannomes
            + '&filtromes=' + this.filtroannomes
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
      clear() {
        this.fieldDate = '';
        this.pickerDate = '';
        this.menu = false;
        this.filtroannomes = false;
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
