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
          :items="cantidadFO"
          clearable
          item-value="id"
          item-text="valor"
          label="Cantidad de FO"
          :attach="true"
          v-model="valor_FO"
          return-object
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
  import {JasperAPIBase} from "@/applications/onei/config/axios-config";
  import {downloadFile} from "@/applications/onei/utils/applicationsUtil";
  import {QUERY_DPA_ACTIVAS, QUERY_MERCADO_MONEDA} from "./graphql/graphql-reportes.js";
  import LoadingDialog from "@shared/components/loading-dialog/loading-dialog.vue";

  export default {
    name: "onei-reporte-faltas-ocasionales-variedades",
    components: {
      VLayout,
      VFlex,
      VForm,
      VBtn,
      VIcon,
      VDialog,
      VAutocomplete,
      VSelect,
      VRadioGroup,
      VRadio,
      LoadingDialog
    },
    props: {},
    watch: {
      valor_FO(val) {
        if (val != null) {
          this.desde_FO = val.desde;
          this.hasta_FO = val.hasta;
          this.filtroFO = true;
        } else {
          this.desde_FO = 0;
          this.hasta_FO = 0;
          this.filtroFO = false;
        }
      },
      dpa(val) {
        this.filtrodpa = !!(val != null && val != -1);
      },
      mercado_moneda(val) {
        this.filtmercadomoneda = !!(val != null && val != -1);
      },
    },
    data() {
      return {
        dpa: -1,
        mercado_moneda: -1,
        valor_FO: -1,
        desde_FO: 0,
        hasta_FO: 0,
        filtrodpa: false,
        filtmercadomoneda: false,
        filtroFO: false,
        linear_active: false,
        formatOutput: '.xls',
        availableFormats: [{label: 'PDF', value: '.pdf'}, {label: 'Excel', value: '.xls'}],
        ruta: '/Reportes_SIGIP/Reportes/Cantidad_de_faltas_ocacionales_por_variedad',
        cantidadFO: [
          {id: 1, valor: "1", desde: 1, hasta: 1},
          {id: 2, valor: "2", desde: 2, hasta: 2},
          {id: 3, valor: "3", desde: 3, hasta: 3},
          {id: 4, valor: "4", desde: 4, hasta: 4},
          {id: 5, valor: "< 10", desde: 5, hasta: 9},
          {id: 6, valor: "Entre 10 y 20", desde: 10, hasta: 20},
          {id: 7, valor: "> 20", desde: 21, hasta: 10000},
        ],
      };
    },

    methods: {
      buscar() {
        if (!this.filtrodpa && !this.filtmercadomoneda && !this.filtroFO) {
          this.$store.dispatch("showMessage", {
            message: "Debe seleccionar un criterio de Búsqueda",
            type: "info"
          })
        } else {
          this.linear_active = true;
          const params =
            '?dpa=' + [this.dpa]
            + '&mercado_moneda=' + [this.mercado_moneda]
            + '&desde_FO=' + [this.desde_FO]
            + '&hasta_FO=' + [this.hasta_FO]
            + '&filtrodpa=' + this.filtrodpa
            + '&filtmercadomoneda=' + this.filtmercadomoneda
            + '&filtroFO=' + this.filtroFO
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
