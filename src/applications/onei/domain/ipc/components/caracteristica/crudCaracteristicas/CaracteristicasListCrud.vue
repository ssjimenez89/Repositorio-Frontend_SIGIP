<template>
  <v-layout>
    <loading-dialog v-model="$apollo.queries.dataTable.loading"
                    message="Cargando Características">

    </loading-dialog>

    <v-flex d-flex md12 xs12>
      <v-card class="elevation-15">
        <v-card-title>
          <v-container fluid grid-list-xl>
            <v-layout wrap>
              <v-flex d-flex md4 xs12>
                <v-text-field
                  :label="this.$i18n.t('applications.onei_ipc.modules.caracteristicas.page.list.search.nombre')"
                  append-icon="search"
                  hide-details
                  return-object
                  single-line
                  v-model="buscar.nombre"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="dataTable"
          :loading="loading"
          :pagination.sync="pagination"
          :rows-per-page-items="pageItems"
          :rows-per-page-text="this.$i18n.t('applications.onei_ipc.components.table.dataTable.rowsPerPageText')"
          :total-items="totalDataTable"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.description }}</td>
            <td class="text-xs-center">{{ props.item.totalespecifications }}</td>
            <td class="text-xs-center">
              <v-tooltip top>
                <v-icon slot="activator">{{ props.item.active ? "done": "clear" }}</v-icon>
                <span>
                  {{ props.item.active
                  ? $t('applications.onei_ipc.modules.caracteristicas.page.list.action_list.estado.enable')
                  :$t('applications.onei_ipc.modules.caracteristicas.page.list.action_list.estado.disable')}}
                </span>
              </v-tooltip>
            </td>
            <td class="text-md-center justify-center layout px-0">
              <v-menu bottom origin="center center" transition="scale-transition">
                <v-btn icon slot="activator">
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile @click="editItem(props.item.id)">
                    <v-list-tile-action>
                      <v-icon>edit</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>{{$t('applications.onei_ipc.modules.caracteristicas.page.list.action_list.edit')}}</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="viewItem(props.item.id)">
                    <v-list-tile-action>
                      <v-icon>visibility</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>{{$t('applications.onei_ipc.modules.caracteristicas.page.list.action_list.view')}}</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile
                    @click="swapDialogDelete(props.item.id)" v-if="props.item.notAllowElimination">
                    <v-list-tile-action>
                      <v-icon>delete</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>{{$t('applications.onei_ipc.modules.caracteristicas.page.list.action_list.delete')}}</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="changeState(props.item.id)">
                    <v-list-tile-action>
                      <v-icon>{{ props.item.active ? "clear": "done" }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                      {{ props.item.active
                      ? $t('applications.onei_ipc.modules.caracteristicas.page.list.action_list.disable')
                      :$t('applications.onei_ipc.modules.caracteristicas.page.list.action_list.enable')}}
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </td>
          </template>

          <template slot="no-data">
<!--              <td class="grey&#45;&#45;background" colspan="4">-->
                <not-found-result :filters="['nombre','edad','sexo']"></not-found-result>
<!--              </td>-->
            <!-- <v-alert :value="true" color="error" icon="warning">
              {{$t('applications.onei_ipc.components.table.no_data')}}
            </v-alert>-->
          </template>
          <template
            slot="pageText"
            slot-scope="props"
          >{{ props.pageStart }} - {{ props.pageStop }} de {{props.itemsLength}}</template>
        </v-data-table>
      </v-card>
    </v-flex>

    <v-dialog max-width="500px" v-model="dialogDeleteCaracteristica">
      <v-card>
        <v-container>
          <v-card-title class="pb-0">
            <span
              class="headline"
            >{{$t('applications.onei_ipc.modules.caracteristicas.page.list.dialog_delete.dialog_tittle')}}</span>
          </v-card-title>
          <v-card-text>
            <v-container class="pt-0" grid-list-md>
              <v-layout
                wrap
              >{{$t('applications.onei_ipc.modules.caracteristicas.page.list.dialog_delete.message')}}</v-layout>
              <v-layout
                class="pt-3 sub_message"
                wrap
              >{{$t('applications.onei_ipc.modules.caracteristicas.page.list.dialog_delete.sub_message')}}</v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click.native="deleteItem(deleteCaracteristica)"
              color="primary"
            >{{$t('applications.onei_ipc.modules.caracteristicas.page.list.dialog_delete.button.ok')}}
            </v-btn>
            <v-btn
              @click.native="swapDialogDelete(null)"
              color="error"
            >{{$t('applications.onei_ipc.modules.caracteristicas.page.list.dialog_delete.button.cancel')}}</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import NotFoundResult from "@onei/core/pages/NotFoundResult.vue";
import VAlert from "@vuetify/components/VAlert";
import VBtn from "@vuetify/components/VBtn";
import LoadingDialog from "@shared/components/loading-dialog/loading-dialog.vue";
import {
  VCard,
  VCardActions,
  VCardText,
  VCardTitle
} from "@vuetify/components/VCard";
import { VDataTable } from "@vuetify/components/VDataTable";
import VDialog from "@vuetify/components/VDialog";
import { VSpacer } from "@vuetify/components/VGrid";
import VContainer from "@vuetify/components/VGrid/VContainer";
import VFlex from "@vuetify/components/VGrid/VFlex";
import VLayout from "@vuetify/components/VGrid/VLayout";
import VIcon from "@vuetify/components/VIcon";
import {
  VList,
  VListTile,
  VListTileAction,
  VListTileContent,
  VListTileTitle
} from "@vuetify/components/VList";
import VMenu from "@vuetify/components/VMenu";
import VTextField from "@vuetify/components/VTextField";
import { VToolbar, VToolbarTitle } from "@vuetify/components/VToolbar";
import VTooltip from "@vuetify/components/VTooltip";
import {
  CARACTERISTICA_PAGE,
  CHANGE_STATE_CARACTERISTICA,
  DELETE_CARACTERISTICA,
  TOTAL_CARACTERISTICA_PAGE
} from "./graphql/graphql-caracteristicas.js";

export default {
  name: "onei-caracteristicas-crud-list",
  components: {
    NotFoundResult,
    VLayout,
    VAlert,
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
    VContainer,
    VFlex,
    VToolbar,
    VToolbarTitle,
    LoadingDialog
  },
  props: [],
  data() {
    return {
      pageItems: [5, 10, 25, { text: "Todos", value: -1 }],
      totalDataTable: 0,
      dataTable: [],
      pagination: {},
      headers: [],
      loading: true,
      buscar: {
        nombre: ""
      },
      dialogDeleteCaracteristica: false,
      deleteCaracteristica: null,
      isCaractRelacionada: true,

    };
  },
  created() {
    this.initialize();
  },
  apollo: {
    totalDataTable: {
      query: TOTAL_CARACTERISTICA_PAGE,
      variables: {
        description: ""
      },
      update(data) {
        return data.totalcharateristicByDescriptionPage;
      }
    },
    dataTable: {
      query: CARACTERISTICA_PAGE,
      variables: {
        description: "",
        page: 0,
        size: 5
      },
      update(data) {
        this.loading = false;
        return data.charateristicByDescriptionPage;
      }
    }
  },
  methods: {
    initialize() {
      this.headers = [
        {
          align: "left",
          sortable: false,
          text: this.$i18n
            .t(
              "applications.onei_ipc.modules.caracteristicas.page.list.header.nombre"
            )
            .toString(),
          value: "nombre"
        },
        {
          sortable: false,
          align: "center",
          text: this.$i18n
            .t(
              "applications.onei_ipc.modules.caracteristicas.page.list.header.especificaciones"
            )
            .toString(),
          value: "especificaciones"
        },
        {
          sortable: false,
          align: "center",
          text: this.$i18n
            .t(
              "applications.onei_ipc.modules.caracteristicas.page.list.header.estado"
            )
            .toString(),
          value: "estado"
        },
        {
          sortable: false,
          align: "center",
          text: this.$i18n
            .t(
              "applications.onei_ipc.modules.caracteristicas.page.list.header.acciones"
            )
            .toString(),
          value: "acciones"
        }
      ];
    },
    getDataFromApi() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;

        const pagina = page - 1;

        setTimeout(() => {
        this.$apollo.queries.totalDataTable.refetch({
          description: this.buscar.nombre
        });

        this.$apollo.queries.dataTable.fetchMore({
          variables: {
            description: this.buscar.nombre,
            page: pagina,
            size: rowsPerPage
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
              const items = fetchMoreResult.charateristicByDescriptionPage;

            this.loading = false;
            resolve({
              items
            });
          }
        });
        }, 1500);

      });
    },
    editItem(id) {
      this.$store.commit("@onei.ipc/setEditCharacteristicsId", { id });
      this.$router.push("/onei/sigip/ipc/caracteristicas/editar");
    },
    viewItem(id) {
      this.$store.commit("@onei.ipc/setViewCharacteristicsId", { id });
      this.$router.push("/onei/sigip/ipc/caracteristicas/visualizar");
    },
    swapDialogDelete(item) {
      this.deleteCaracteristica = item;
      this.dialogDeleteCaracteristica = !this.dialogDeleteCaracteristica;
    },
    deleteItem(id) {
      if (id != null) {
        this.$apollo
          .mutate({
            mutation: DELETE_CARACTERISTICA,
            variables: {
              id
            }
          })
          .then(data => {
            this.swapDialogDelete(null);
            this.getDataFromApi().then(data => {
              this.loading = false;
              this.dataTable = data.items;
            });

            // Aqui poner le llamado del snackbar
          })
          .catch(error => {
            // Aqui poner le llamado del snackbar type error
            console.error(error);
          });
      }
    },
    changeState(id) {
      if (id != null) {
        this.$apollo
          .mutate({
            mutation: CHANGE_STATE_CARACTERISTICA,
            variables: {
              id
            }
          })
          .then(data => {
            this.getDataFromApi().then(data => {
              this.loading = false;
              this.dataTable = data.items;
            });

            // Aqui poner le llamado del snackbar
          })
          .catch(error => {
            // Aqui poner le llamado del snackbar type error
            console.error(error);
          });
      }
    }
  },
  computed: {},
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi().then(data => {
          this.loading = false;
          this.dataTable = data.items;
        });
      }
    },
    "buscar.nombre"(val) {
      this.pagination = {
        page: 1,
        rowsPerPage: this.pagination.rowsPerPage
      };
    }
  },
  destroyed() {}
};
</script>


<style lang="stylus" scoped>
.sub_message {
  font-size: 0.88em;
  color: #90A4AE;
}
</style>
