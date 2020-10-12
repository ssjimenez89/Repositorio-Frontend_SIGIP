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
  import {VRadioGroup, VRadio} from "@vuetify/components/VRadioGroup";
  import {QUERY_DPA_ACTIVAS} from "./graphql/graphql-reportes.js";
  import {JasperAPIBase} from "@/applications/onei/config/axios-config";
  import {downloadFile} from "@/applications/onei/utils/applicationsUtil";
  import LoadingDialog from "@shared/components/loading-dialog/loading-dialog.vue";

  export default {
    name: "onei-reporte-establecimiento-dpa",
    components: {
      VLayout,
      VFlex,
      VForm,
      VBtn,
      VIcon,
      VDialog,
      VAutocomplete,
      VRadioGroup,
      VRadio,
      LoadingDialog
    },
    props: {},
    watch: {
      dpa(val) {
        this.filtrodpa = !!(val != null && val != -1);
      },
    },

    data() {
      return {
        dpa: -1,
        filtrodpa: false,
        linear_active: false,
        formatOutput: '.xls',
        availableFormats: [{label: 'PDF', value: '.pdf'}, {label: 'Excel', value: '.xls'}],
        ruta: '/Reportes_SIGIP/Reportes/Establecimientos_por_DPA_',
      };
    },

    methods: {
      buscar() {
        if (!this.filtrodpa) {
          this.$store.dispatch("showMessage", {
            message: "Debe seleccionar un criterio de Búsqueda",
            type: "info"
          })
        } else {
          this.linear_active = true;
          const params =
            '?dpa=' + [this.dpa]
            + '&filtrodpa=' + this.filtrodpa
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
