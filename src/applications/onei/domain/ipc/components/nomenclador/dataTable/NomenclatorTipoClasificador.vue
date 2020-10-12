<template>

    <v-data-table
      :headers="headers"
      :items="nomenclators"
      :loading="loading"
      :pagination.sync="pagination"
      :rows-per-page-items="pageItems"
      :rows-per-page-text="this.$i18n.t('applications.onei_ipc.components.table.dataTable.rowsPerPageText')"
      :total-items="total"

    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-left">{{ $t('applications.onei_ipc.modules.nomenclador.types.'+props.item.__typename) }}</td>
        <td class="text-xs-left">{{ $t('applications.onei_ipc.modules.nomenclador.fields.'+props.item.active) }}</td>
        <td class="text-md-center justify-center layout px-0">
          <v-menu bottom
                  origin="center center"
                  transition="scale-transition">
            <v-btn icon slot="activator">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile :to="`/onei/sigip/ipc/nomenclador/editar/tipo/tipo_clasificador/${props.item.id}`">
                <v-list-tile-action>
                  <v-icon>edit</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                  {{$t('applications.onei_ipc.modules.nomenclador.pages.list_nomenclador.action_list.edit')}}
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile :to="`/onei/sigip/ipc/nomenclador/view/tipo/tipo_clasificador/${props.item.id}`">
                <v-list-tile-action>
                  <v-icon>visibility</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                  {{$t('applications.onei_ipc.modules.nomenclador.pages.list_nomenclador.action_list.view')}}
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </td>
      </template>
      <template slot="no-data">
       <no-found-result></no-found-result>
      </template>

      <!--v-alert v-slot:no-results :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert-->

      <template slot="pageText" slot-scope="props">
        {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
      </template>
    </v-data-table>

</template>

<script lang="ts">
  import VAlert from "@vuetify/components/VAlert";
  import VBtn from "@vuetify/components/VBtn";
  import {VCard, VCardActions, VCardText, VCardTitle} from "@vuetify/components/VCard";
  import {VDataTable} from "@vuetify/components/VDataTable";
  import VDialog from "@vuetify/components/VDialog";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VIcon from "@vuetify/components/VIcon";
  import {VList, VListTile, VListTileAction, VListTileContent, VListTileTitle} from "@vuetify/components/VList";
  import VMenu from "@vuetify/components/VMenu";
  import VTextField from "@vuetify/components/VTextField";
  import VTooltip from "@vuetify/components/VTooltip";
  import gql from 'graphql-tag';
  import {
    QUERY_GET_CLASSIFIERTYPE_PAGING,
    SEARCH_CLASSIFIERTYPE_BY_DESCRIPTION,
    TOTAL_SEARCH_CLASSIFIERTYPE_BY_DESCRIPTION
  } from "../../../components/nomenclador/graphql/graphql-nomenclador.js";
  import NoFoundResult from "@shared/components/no-found-result/no-found-result.vue";
  import {filterModelProperty} from "@shared/mixins";

  export default {
    name: "onei-nomenclador-list-tipo_clasificador",
    mixins:[filterModelProperty],
    components: {
      NoFoundResult,
      VAlert,
      VContainer,
      VFlex,
      VLayout,
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
      VSpacer
    },
    data() {
      return {
        pageItems: [5, 10, 25, {"text": "Todos", "value": -1}],
        totalNomenclators: 0,
        totalNomenclatorsFilter: 0,
        nomenclators: [],
        loading: true,
        pagination: {},
        headers: [],
        search: '',
      }
    },
    computed: {
      total() {
        if (!this.filterModel.nombre) {
          return this.totalNomenclators
        } else {
          return this.totalNomenclatorsFilter
        }
      }
    },
    apollo: {
      nomenclators: {
        query: QUERY_GET_CLASSIFIERTYPE_PAGING,
        variables: {
          page: 0,
          size: 5
        },
        update(data) {
          return data.classifierTypesPaging
        }
      },
      totalNomenclators: {
        query: gql`query{
          totalClassifierTypes
      }`,
        update(data) {
          return data.totalClassifierTypes
        }
      },
      nomenclatorsFilter: {
        query: SEARCH_CLASSIFIERTYPE_BY_DESCRIPTION,
        variables: {
          description: "null",
          page: 0,
          size: 5
        },
        update(data) {
          return data.classifierTypeByDescriptionContains
        }
      },
      totalNomenclatorsFilter: {
        query: TOTAL_SEARCH_CLASSIFIERTYPE_BY_DESCRIPTION,
        variables: {
          description: "null",
        },
        update(data) {
          return data.totalClassifierTypesByDescriptionContains
        }
      }
    },
    watch: {
      pagination: {
        handler() {
          this.getDataFromApi()
            .then(data => {
              this.loading = false;
              this.nomenclators = data.items
            })
        }
      },
      filterModel(val) {

        this.pagination = {
          page: 1,
          rowsPerPage: this.pagination.rowsPerPage
        };
        this.getDataFromApi().then(data => {
          this.loading = false;
          this.nomenclators = data.items
        });
      }
    },
    created() {
      this.initialize()
    },
    methods: {
      initialize() {
        this.headers = [
          {
            sortable: false,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.nomenclador.pages.list_nomenclador.header_list.description"
              )
              .toString(),
            value: "description"
          },
          {
            sortable: false,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.nomenclador.pages.list_nomenclador.header_list.type"
              )
              .toString(),
            value: "__typename"
          },
          {
            sortable: false,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.nomenclador.pages.list_nomenclador.header_list.active"
              )
              .toString(),
            value: "active"
          },
          {
            sortable: false,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.nomenclador.pages.list_nomenclador.header_list.actions"
              )
              .toString(),
            value: "Acciones"
          }
        ];
      },
      getDataFromApi() {
        this.loading = true;
        if (this.filterModel.nombre !=='') {
          return new Promise((resolve, reject) => {
            const {sortBy, descending, page, rowsPerPage} = this.pagination;
            const pagina = page - 1;
            this.$apollo.queries.totalNomenclatorsFilter.refetch({
              description: this.filterModel.nombre
            });
            this.$apollo.queries.nomenclatorsFilter.fetchMore({
              variables: {
                description: this.filterModel.nombre,
                page: pagina,
                size: rowsPerPage
              },
              updateQuery: (previousResult, {fetchMoreResult}) => {
                const items = fetchMoreResult.classifierTypeByDescriptionContains;
                this.loading = false;
                resolve({
                  items
                })
              }
            })
          })
        } else {
          return new Promise((resolve, reject) => {
            const {sortBy, descending, page, rowsPerPage} = this.pagination;
            const pagina = page - 1;
            this.$apollo.queries.totalNomenclators.refetch();
            this.$apollo.queries.nomenclators.fetchMore({
              variables: {
                page: pagina,
                size: rowsPerPage
              },
              updateQuery: (previousResult, {fetchMoreResult}) => {
                const items = fetchMoreResult.classifierTypesPaging;
                this.loading = false;
                resolve({
                  items
                })
              }
            })
          })
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>

</style>
