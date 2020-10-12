<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-card class="elevation-15">
<!--    <v-card-title>-->
<!--      <h4 class="title">{{$t('applications.onei_administracion.modules.traza.pages.traza_list.page_title')}}</h4>-->
<!--    </v-card-title>-->
    <v-container grid-list-xl fluid>
      <v-layout wrap>
        <v-flex md3>
          <v-menu
            v-model="menu_desde"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="defaultTraza.fechaI"
                label="Fecha desde"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="defaultTraza.fechaI"
              @input="menu_desde = false"
              locale="es-ES"
              no-title
              scrollable
              :min=desde_minimo
              :max=desde_maximo
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary"
                     small
                     outline
                     @click="clear_desde"
              >Limpiar
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex md3>
          <v-menu
            v-model="menu_hasta"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="defaultTraza.fechaF"
                label="Fecha hasta"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="defaultTraza.fechaF"
              @input="menu_hasta = false"
              locale="es-ES"
              no-title
              scrollable
              :min=hasta_minimo
              :max=hasta_maximo
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary"
                     small
                     outline
                     @click="clear_hasta"
              >Limpiar
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex md3>
          <v-text-field
            append-icon="search"
            label="Usuario"
            single-line
            return-object
            hide-details
            v-model="defaultTraza.usuario"
          ></v-text-field>
        </v-flex>
        <v-flex md3>
          <v-select
            v-model="defaultTraza.tipoOperacion"
            item-value="valor"
            item-text="valor"
            :items="tiposOperacion"
            clearable
            label="Tipo Operación"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout wrap>
        <v-flex md3>
          <v-btn
            @click="buscar()"
            color="primary"
            type="submit"
            append-icon="search"
          >
            <v-icon>search</v-icon>
            Buscar
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <!--    :loading="loading"-->
        <v-data-table
          :headers="headers"
          :items="trazas"
          :pagination.sync="pagination"
          :total-items="totalDataTable"
          class="elevation-1"
          :rows-per-page-text="this.$i18n.t('applications.onei_ipc.components.table.dataTable.rowsPerPageText')"
          :rows-per-page-items="pageItems"
        >
          <template slot="items" slot-scope="props">
            <td class="text-md-left justify-left">{{ props.item.fecha }}</td>
            <td class="text-md-left justify-left">{{ props.item.usuario }}</td>
            <td class="text-md-left justify-left">{{ props.item.descripcion }}</td>
            <td class="text-md-left justify-left">{{ props.item.tipoOperacion }}</td>
            <td class="text-md-left justify-left">{{ props.item.ip }}</td>
          </template>
          <template slot="no-data">
            <not-found-result></not-found-result>
          </template>
        </v-data-table>
  </v-card>

</template>
<script lang="ts">
import NotFoundResult from "@onei/core/pages/NotFoundResult.vue";
import MainContent from "@shared/components/main-content/main-content";
import VAlert from "@vuetify/components/VAlert";
import VAutocomplete from "@vuetify/components/VAutocomplete";
import VBtn from "@vuetify/components/VBtn";
import {VCard, VCardActions, VCardText, VCardTitle} from "@vuetify/components/VCard";
import VCheckbox from "@vuetify/components/VCheckbox";
import {VDataTable} from "@vuetify/components/VDataTable";
import VDatePicker from "@vuetify/components/VDatePicker/VDatePicker";
import VDialog from "@vuetify/components/VDialog";
import {VSpacer} from "@vuetify/components/VGrid";
import VContainer from "@vuetify/components/VGrid/VContainer";
import VContent from "@vuetify/components/VGrid/VContent";
import VFlex from "@vuetify/components/VGrid/VFlex";
import VLayout from "@vuetify/components/VGrid/VLayout";
import VIcon from "@vuetify/components/VIcon";
import {VList, VListTile, VListTileAction, VListTileContent, VListTileTitle} from "@vuetify/components/VList";
import VMenu from "@vuetify/components/VMenu";
import VSelect from "@vuetify/components/VSelect";
import VSwitch from "@vuetify/components/VSwitch";
import VTextField from "@vuetify/components/VTextField";
import VToolbar from "@vuetify/components/VToolbar";
import VTooltip from "@vuetify/components/VTooltip";
import {ITraza} from "../../interfaces/traza/ITraza";
import {get_trazas_page} from "../../services/traza_services";

export default {
  name: "onei-traza-list",
  components: {
    NotFoundResult,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VTextField,
    VDataTable,
    VMenu,
    VBtn,
    VIcon,
    VTooltip,
    VList,
    VListTile,
    VListTileContent,
    VListTileTitle,
    VListTileAction,
    VDialog,
    VSpacer,
    VSwitch,
    MainContent,
    VAutocomplete,
    VToolbar,
    VLayout,
    VContainer,
    VContent,
    VFlex,
    VAlert,
    VCheckbox,
    VSelect,
    VDatePicker,
  },
  created() {
    this.initialize();
  },
  data() {
    const defaultTraza: ITraza = {
      // fechaDesde: new Date().toISOString().substr(0, 10),
      fechaI: "",
      fechaF: "",
      tipoOperacion: "",
      usuario: "",
    };
    return {
      defaultTraza,
      pageItems: [5, 10, 25],
      totalDataTable: 0,
      dataTable: [],
      loading: true,
      pagination: {},
      headers: [],
      totalDataFilter: 0,
      tiposOperacion: [{id: 1, valor: "Registrar"}, {id: 2, valor: "Modificar"}, {id: 3, valor: "Desactivar"}, {
        id: 4,
        valor: "Obtener"
      }],
      trazas: [],
      menu_desde: false,
      menu_hasta: false,
      desde_minimo: "2020-01-01",
      desde_maximo: new Date().toISOString().substr(0, 10),
      hasta_minimo: "2020-01-01",
      hasta_maximo: new Date().toISOString().substr(0, 10),
    }
  },
  watch: {
    pagination (event) {
      // debugger;
      get_trazas_page(event, this.defaultTraza).then(data => {
        this.setData(data);
      });
    },

    "defaultTraza.fechaI" (val, old) {
      this.hasta_minimo = val;
    },
    "defaultTraza.fechaF" (val, old) {
      this.desde_maximo = val;
    }

  },
  methods: {
    clear_desde() {
      this.defaultTraza.fechaI = "";
      this.menu_desde = false;
    },
    clear_hasta() {
      this.defaultTraza.fechaF = "";
      this.menu_hasta = false;
    },
    setData(data) {
      if (data.data._embedded) {
        this.trazas = [...data.data._embedded.trazaResourceList];
        this.totalDataTable = data.data.page.totalElements;
      } else {
        this.trazas = [];
        this.totalDataTable = 0;
      }
    },
    buscar(item: ITraza) {
      get_trazas_page({page: 1, rowsPerPage: this.pagination.rowsPerPage}, this.defaultTraza).then(data => {
        this.setData(data);
      });

    },
    initialize() {
      this.headers = [
        {
          align: "left",
          sortable: false,
          text: "Fecha",
          value: "Fecha",
          width: "16%",
        },
        {
          sortable: false,
          align: "left",
          text:"Usuario",
          value: "Usuario",
          width: "10%",
        },
        {
          sortable: false,
          align: "left",
          text: "Descripción",
          value: "Descripción",
          width: "46%",
        },
        {
          sortable: false,
          align: "left",
          text: "Operación",
          value: "Operación",
          width: "10%",
        },
        {
          sortable: false,
          align: "left",
          text: "Ip",
          value: "Ip",
          width: "18%",
        },
      ];
    }
  }
};
</script>
<style lang="stylus" scoped>
  .list__tile
    font-size: 13px;

  .list__tile__action
    min-width: 30px;

  .icon
    font-size: 21px;

  .list__tile__title
    font-size: 13px;

  .spacer_text_field
    margin-left: 50%;

  .add_container {
    width: 100%;
  }

</style>
