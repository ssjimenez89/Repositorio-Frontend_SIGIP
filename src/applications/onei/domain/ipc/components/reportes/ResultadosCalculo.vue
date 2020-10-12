<template>
  <div id="content">
    <loading-dialog v-model="linear_active" message="Cargando el reporte"></loading-dialog>
    <v-layout>
      <v-flex md4>
        <v-autocomplete
          :items="lista_nivel_agregacion"
          item-value="id"
          item-text="description"
          label="Nivel de Agregación"
          clearable
          :attach="true"
          v-model="nivel"
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
            >Limpiar</v-btn>
          </v-date-picker>
        </v-menu>
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
  import {QUERY_NIVEL_AGREGACION} from "./graphql/graphql-reportes.js";
  import AutocompleteVariedadField
    from "@shared/components/autocomplete-variedad-field/autocomplete-variedad-field.vue";
  import AutocompleteEstablecimientoFiled
    from "@shared/components/autocomplete-establecimiento-field/autocomplete-establecimiento-filed.vue";
  import VDatePicker from "@vuetify/components/VDatePicker/VDatePicker";
  import MonthPickerMenu from "@shared/components/month-picker-menu/month-picker-menu";
  import {downloadFile} from "@/applications/onei/utils/applicationsUtil";
  import {JasperAPIBase} from "@/applications/onei/config/axios-config";
  import LoadingDialog from "@shared/components/loading-dialog/loading-dialog.vue";

  export default {
    name: "onei-reporte-resultados-calculo",
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
        nivel: -1,
        pickerDate:'',
        fieldDate: '',
        valor_mes: -1,
        valor_anno: -1,
        max: new Date().toISOString().substr(0,10),
        menu: false,
        filtronivel: false,
        filtroannomes: false,
        linear_active: false,
        formatOutput: '.xls',
        availableFormats: [{label: 'PDF', value: '.pdf'}, {label: 'Excel', value: '.xls'}],
        ruta: '/Reportes_SIGIP/Reportes/Reporte_ResultadosCalculo',
      };
    },

    methods: {
      buscar() {
        if (!this.filtronivel && !this.filtroannomes) {
          this.$store.dispatch("showMessage", {
            message: "Debe seleccionar un criterio de Búsqueda",
            type: "info"
          })
        } else {
          this.linear_active = true;
          const params =
            '?nivel=' + [this.nivel]
            + '&mes=' + [this.valor_mes]
            + '&anno=' + [this.valor_anno]
            + '&filtronivel=' + this.filtronivel
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
      clear(){
        this.fieldDate = '';
        this.menu = false;
        this.filtroannomes = false;
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
      nivel(val){
        this.filtronivel = !!(val != null && val != -1);
      },
    },

    apollo: {
      lista_nivel_agregacion: {
        query: QUERY_NIVEL_AGREGACION,
        update: data => data.classifierTypes,
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
