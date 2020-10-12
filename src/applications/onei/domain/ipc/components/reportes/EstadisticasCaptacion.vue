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
            :min="min"
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
        <v-select
          :items="lista_temp_semanas"
          clearable
          item-value="id"
          item-text="valor"
          label="Semanas"
          :attach="true"
          v-model="semana"
        ></v-select>
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
      <v-flex md4>
        <date-picker-menu
          clearButton
          :attach="true"
          label="Fecha captada"
          v-model="fecha_captada"
        ></date-picker-menu>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex md4>
        <autocomplete-generic-filed
          label="Artículo"
          :query="query"
          identificador="id"
          filter-by="descripcion"
          text="description"
          data-name="articulosFiltrados"
          @change="selectArticulo($event)"
        ></autocomplete-generic-filed>
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
  import VSelect from "@vuetify/components/VSelect";
  import VIcon from "@vuetify/components/VIcon/index";
  import VAutocomplete from "@vuetify/components/VAutocomplete/index";
  import {VRadioGroup, VRadio} from "@vuetify/components/VRadioGroup";
  import {QUERY_DPA_ACTIVAS, QUERY_MERCADO_MONEDA, QUERY_ARTICULOS_FILTRADOS} from "./graphql/graphql-reportes.js";
  import AutocompleteVariedadField
    from "@shared/components/autocomplete-variedad-field/autocomplete-variedad-field.vue";
  import VDatePicker from "@vuetify/components/VDatePicker/VDatePicker";
  import MonthPickerMenu from "@shared/components/month-picker-menu/month-picker-menu";
  import AutocompleteGenericFiled from "@shared/components/auto-complete-generic-field/auto-complete-generic-field";
  import {JasperAPIBase, RestAPIBase} from "@/applications/onei/config/axios-config";
  import {downloadFile} from "@/applications/onei/utils/applicationsUtil";
  import DatePickerMenu from "@shared/components/date-picker-menu/date-picker-menu";
  import LoadingDialog from "@shared/components/loading-dialog/loading-dialog.vue";

  export default {
    name: "onei-reporte-estadisticas-captacion",
    components: {
      AutocompleteVariedadField,
      AutocompleteGenericFiled,
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
      VSelect,
      VRadioGroup,
      VRadio,
      DatePickerMenu,
      LoadingDialog
    },
    props: {},

    data() {
      return {
        dpa: -1,
        variedad: -1,
        articulo: -1,
        valor_mes: -1,
        valor_anno: -1,
        mercado_moneda: -1,
        semana: -1,
        usuario: -1,
        fecha_captada: '',
        real_fecha: '',
        pickerDate: '',
        fieldDate: '',
        min: new Date().toISOString().substr(0, 10),
        max: new Date().toISOString().substr(0, 10),
        menu: false,
        menu_date: false,
        usuarios: [],

        filtrodpa: false,
        filtrovariedad: false,
        filtroarticulo: false,
        filtromercado: false,
        filtrosemanas: false,
        filtrousuario: false,
        filtroannomes: false,
        filtrofechacaptada: false,
        linear_active: false,
        formatOutput: '.xls',
        availableFormats: [{label: 'PDF', value: '.pdf'}, {label: 'Excel', value: '.xls'}],
        ruta: '/Reportes_SIGIP/Reportes/Reporte_Estadisticas_sobre_la_captacion',
        lista_temp_semanas: [
          {id: 1, valor: "Semana 1"},
          {id: 2, valor: "Semana 2",},
          {id: 3, valor: "Semana 3",},
          {id: 4, valor: "Semana 4",},
        ],
        query: {
          query: QUERY_ARTICULOS_FILTRADOS,
          variables: {
            descripcion: "",
            page: 0,
            size: 10
          }
        },
      };
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
        if (!this.filtrodpa && !this.filtrovariedad && !this.filtroarticulo &&
          !this.filtromercado && !this.filtrosemanas && !this.filtrousuario && !this.filtroannomes && !this.filtrofechacaptada) {
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
            + '&articulo=' + [this.articulo]
            + '&mercado_moneda=' + [this.mercado_moneda]
            + '&semana=' + [this.semana]
            + '&usuario=' + [this.usuario]
            + '&mes=' + [this.valor_mes]
            + '&anno=' + [this.valor_anno]
            + '&fechacaptada=' + [this.real_fecha]
            + '&filtrodpa=' + this.filtrodpa
            + '&filtrovariedad=' + this.filtrovariedad
            + '&filtroarticulo=' + this.filtroarticulo
            + '&filtromercado=' + this.filtromercado
            + '&filtrosemanas=' + this.filtrosemanas
            + '&filtrousuario=' + this.filtrousuario
            + '&filtroanno=' + this.filtroannomes
            + '&filtromes=' + this.filtroannomes
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
      clear() {
        this.fieldDate = '';
        this.menu = false;
        this.filtroannomes = false;
      },
      // clear_date() {
      //   this.fecha_captada = '';
      //   this.menu_date = false;
      //   this.filtrofechacaptada = false;
      // },
      selectVariedad($event) {
        if ($event != null) {
          this.variedad = $event.id;
        } else {
          this.variedad = null;
        }
      },
      selectArticulo($event) {
        if ($event != null) {
          this.articulo = $event.id;
        } else {
          this.articulo = null;
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
      articulo(val) {
        this.filtroarticulo = !!(val != null && val != -1);
      },
      mercado_moneda(val) {
        this.filtromercado = !!(val != null && val != -1);
      },
      usuario(val) {
        this.filtrousuario = !!(val != null && val != -1);
      },
      semana(val) {
        this.filtrosemanas = !!(val != null && val != -1);
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
