<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">{{ $t('applications.onei_ipc.messages.confirmation') }}</v-card-title>

        <v-card-text>
          {{ $t('applications.onei_ipc.modules.establecimiento.messages.alert_delete') }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            {{ $t('applications.onei_ipc.messages.cancel') }}
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="aceptConfirm()"
          >
            {{ $t('applications.onei_ipc.messages.acept') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="dataTable"
      :pagination.sync="pagination"
      :total-items="total"
      :loading="loading"

      :rows-per-page-text="this.$i18n.t('applications.onei_ipc.components.table.dataTable.rowsPerPageText')"
      :rows-per-page-items="pageItems"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.state.descripcion }}</td>
        <td class="text-xs-left">{{ props.item.code }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.typology.description }}</td>
        <td class="text-xs-left">{{ props.item.market.market.description}}-{{
          props.item.market.currency.description}}
        </td>
        <td class="text-xs-left">{{ props.item.address }}</td>
        <td class="text-md-center justify-center layout px-0">
          <v-menu bottom
                  origin="center center"
                  transition="scale-transition">
            <v-btn slot="activator" icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile :to="`/onei/sigip/ipc/establecimiento/editar/${props.item.id}`">
                <v-list-tile-action>
                  <v-icon>edit</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                  {{$t('applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.action_list.edit')}}
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile :to="`/onei/sigip/ipc/establecimiento/visualizar/${props.item.id}`">
                <v-list-tile-action>
                  <v-icon>visibility</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                  {{$t('applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.action_list.view')}}
                </v-list-tile-title>
              </v-list-tile>
              <!--v-list-tile @click="showDialog(props.item.id)">
                <v-list-tile-action>
                    <v-icon>delete</v-icon>
                  </v-list-tile-action>
                <v-list-tile-title>{{$t('applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.action_list.delete')}}</v-list-tile-title>
              </--v-list-tile-->
              <v-list-tile
                :to="`/onei/sigip/ipc/variedad/${props.item.id}-${props.item.typology.id}-${props.item.market.id}`">
                <v-list-tile-action>
                  <v-icon>add</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                  {{$t('applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.action_list.add_variety')}}
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </td>
      </template>
      <template slot="no-data">
        <no-found-result></no-found-result>
      </template>
      <template slot="pageText" slot-scope="props">
        {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
      </template>
    </v-data-table>
  </div>


</template>

<script>
  import VAlert from "@vuetify/components/VAlert"
  import VBtn from "@vuetify/components/VBtn";
  import {
    VCard,
    VCardActions,
    VCardText,
    VCardTitle
  } from "@vuetify/components/VCard";
  import {VDataTable} from "@vuetify/components/VDataTable";
  import VDialog from "@vuetify/components/VDialog";
  import {VSpacer} from "@vuetify/components/VGrid";
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
  import VSelect from "@vuetify/components/VSelect";
  import VTextField from "@vuetify/components/VTextField";
  import VTooltip from "@vuetify/components/VTooltip";
  import gql from 'graphql-tag';
  import {
    DELETE_ESTABLISHMENT_MUTATION,
    FILTER_ESTABLISHMENT,
    QUERY_GET_DPA,
    QUERY_GET_ESTABLISHMENT,
    QUERY_GET_ESTABLISHMENT_PAGING,
    QUERY_GET_MARKETS,
    QUERY_GET_TYPOLOGIES,
    TOTAL_FILTER_ESTABLISHMENT,
    QUERY_GET_STATE
  } from "../../components/establecimiento/graphql/graphql-nomenclador.js";
  import {VToolbar, VToolbarTitle} from "@vuetify/components/VToolbar";
  import NoFoundResult from "@shared/components/no-found-result/no-found-result.vue";
  import {filterable} from "@shared/mixins";
  import {IFilterModel, PaginModel} from "@shared/types";

  export default {
    name: "onei-establecimiento-list",
    mixins: [filterable],
    components: {
      NoFoundResult,
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
      VSelect,
      VToolbar,
      VToolbarTitle,
    },
    data() {
      return {
        paginModel: new PaginModel(),
        pageItems: [5, 10, 25, {"text": "Todos", "value": -1}],
        totalDataTable: 0,
        dataTable: [],
        loading: true,
        pagination: {},
        headers: [],
        search: false,
        dialog: false,
        idCurrent: '',
        dpas: [],
        typologies: [],
        markets: [],
        states: [],
        establishments: [],
        typologySelected: {id: -1, description: "Seleccione"},
        marketSelected: {id: -1, description: "Seleccione"},
        dpaSelected: {id: -1, description: "Seleccione"},
        stateSelected: {id: -1, descripcion: "Seleccione"},
        establishment: '',

        totalDataFilter: 0,
        address: '',
        code: '',
        flagMarketSelected: false,
        flagTypologySelected: false,
        flagDpaSelected: false,
        flagEstablishmentSelected: false,
        flagSateSelected: false,
        flagCodeSelected: false
      }
    },
    computed: {
      total() {
        if (!this.search) {
          return this.totalDataTable
        } else {
          return this.totalDataFilter
        }
      }
    },
    apollo: {
      dataTable: {
        query: QUERY_GET_ESTABLISHMENT_PAGING,
        variables: {
          page: 0,
          size: 5
        },
        update(data) {
          return data.establishmentsPaging
        }
      },
      totalDataTable: {
        query: gql`query{
          totalEstablishment
      }`,
        update(data) {
          return data.totalEstablishment
        }
      },
      dataFilter: {
        query: FILTER_ESTABLISHMENT,
        variables: {
          marketId: -1,
          typologyId: -1,
          dpaId: -1,
          stateId: -1,
          establishment: "",
          code: "",
          stateId: -1,
          page: 0,
          size: 5
        },
        update(data) {
          return data.filterEstablishments
        }
      },
      totalDataFilter: {
        query: TOTAL_FILTER_ESTABLISHMENT,
        variables: {
          marketId: -1,
          typologyId: -1,
          dpaId: -1,
          establishment: "-1",
          code: "",
          stateId: -1
        },
        update(data) {
          return data.totalEstablishmentsByFilter
        }
      }
    },
    watch: {
      pagination: {
        handler() {
          this.getDataFromApi()
            .then(data => {
              this.loading = false
              this.dataTable = data.items
            })
        }
      },
      filterModel(val) {
        const defaultModel = new IFilterModel();
        Object.keys(defaultModel).forEach(key => {
          if (!val.hasOwnProperty(key)) {
            delete defaultModel[key];
          }
        });
        debugger;
        this.search = JSON.stringify(val) !== JSON.stringify(defaultModel);
        this.pagination = {
          page: 1,
          rowsPerPage: this.pagination.rowsPerPage
        }
      }


    },
    created() {

      this.initialize();
    },
    methods: {
      trowPagination() {
        this.search = this.flagMarketSelected || this.flagTypologySelected || this.flagDpaSelected || this.flagEstablishmentSelected || this.flagSateSelected || this.flagCodeSelected
        // alert(this.search)
        this.pagination = {
          page: 1,
          rowsPerPage: this.pagination.rowsPerPage
        }
      },
      initialize() {
        this.headers = [
          {
            align: "left",
            sortable: false,
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.header_list.state"
              )
              .toString(),
            value: "state"
          },
          {
            sortable: false,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.header_list.code"
              )
              .toString(),
            value: "code"
          },
          {
            sortable: false,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.header_list.establishment"
              )
              .toString(),
            value: "name"
          },
          {
            sortable: false,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.header_list.typology"
              )
              .toString(),
            value: "typology"
          },
          {
            sortable: false,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.header_list.market"
              )
              .toString(),
            value: "market"
          },
          {
            sortable: false,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.header_list.address"
              )
              .toString(),
            value: "address"
          },
          {
            sortable: false,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.header_list.actions"
              )
              .toString(),
            value: "Acciones"
          }
        ];
      },
      getDataFromApi() {
        this.loading = true;
        if (this.search) {
          return new Promise((resolve, reject) => {
            const {sortBy, descending, page, rowsPerPage} = this.pagination;
            const pagina = page - 1;
            this.$apollo.queries.totalDataFilter.refetch({
              marketId: this.filterModel.mercado,
              typologyId: this.filterModel.tipologia,
              dpaId: this.filterModel.dpaId,
              establishment: this.filterModel.establecimientoId,
              stateId: -1,
              code: ''

            });
            this.$apollo.queries.dataFilter.fetchMore({
              variables: {
                marketId: this.filterModel.mercado,
                typologyId: this.filterModel.tipologia,
                dpaId: this.filterModel.dpaId,
                establishment: this.filterModel.establecimientoId,
                code: '',
                stateId: -1,
                page: pagina,
                size: rowsPerPage
              },
              updateQuery: (previousResult, {fetchMoreResult}) => {
                const items = fetchMoreResult.filterEstablishments;
                this.loading = false;
                resolve({
                  items
                })
              }
            })
          })
        } else {
          return new Promise((resolve, reject) => {
            const {sortBy, descending, page, rowsPerPage} = this.pagination
            const pagina = page - 1
            this.$apollo.queries.totalDataTable.refetch();
            this.$apollo.queries.dataTable.fetchMore({
              variables: {
                page: pagina,
                size: rowsPerPage
              },
              updateQuery: (previousResult, {fetchMoreResult}) => {
                const items = fetchMoreResult.establishmentsPaging
                this.loading = false
                resolve({
                  items
                })
              }
            })
          })
        }

      },
      aceptConfirm() {
        const result = this.$apollo.mutate({
          mutation: DELETE_ESTABLISHMENT_MUTATION,
          variables: {
            id: this.idCurrent
          }
        }).then((data) => {
          this.$store.dispatch('showMessage', {
            message: this.$i18n.t("applications.onei_ipc.modules.establecimiento.messages.delete_success "),
            type: 'success'
          });
          // Result
          // console.log(data)
          this.dialog = false
          // reset dataTable
          this.trowPagination()
        }).catch((error) => {
          // Error
          this.$store.dispatch('showMessage', {
            message: this.$i18n.t("applications.onei_ipc.modules.establecimiento.messages.delete_error "),
            type: 'error'
          })
          console.error(error)
        })
      },
      showDialog(id) {
        this.idCurrent = id
        this.dialog = true
      },
      selectEstablishment($event) {
        this.$emit('change', $event.id)
      }
    }
  }
</script>
<style lang="stylus" scoped>

</style>
