<template>
  <v-layout>
    <loading-dialog v-model="$apollo.queries.dataFilter.loading"
                    message="Cargando variedad establecimiento">

    </loading-dialog>

    <v-flex xs12 md11 d-flex>
      <v-card class="elevation-15">
        <v-toolbar card dark color="primary">
          <v-toolbar-title class="subheading">Lista de variedad establecimiento</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-layout row justify-center>
          <v-dialog
            v-model="dialog"
            max-width="290"
          >
            <v-card>
              <v-card-title class="headline">{{ $t('applications.onei_ipc.messages.confirmation') }}</v-card-title>

              <v-card-text>
                {{ $t('applications.onei_ipc.modules.variedadEstablecimiento.messages.alert_delete') }}
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
        </v-layout>

        <v-card-title>
          <v-container grid-list-xl fluid>
            <v-layout wrap>

              <v-flex xs12 md4 d-flex>
                <v-autocomplete
                  v-model="dpaSelected"
                  item-text="description"
                  item-value="id"
                  :items="dpas"
                  attach
                  return-object
                  :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.dpa')"
                ></v-autocomplete>
              </v-flex>

              <v-flex xs12 md4 d-flex>
                <v-autocomplete
                  item-text="description"
                  item-value="id"
                  v-model="marketSelected"
                  :items="markets"
                  attach
                  return-object
                  :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.market')"
                ></v-autocomplete>
              </v-flex>

              <v-flex xs12 md4 d-flex>
                <v-autocomplete
                  item-text="description"
                  item-value="id"
                  v-model="typologySelected"
                  :items="typologies"
                  attach
                  return-object
                  :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.typology')"
                ></v-autocomplete>
              </v-flex>

              <v-flex xs12 md4 d-flex>
                <v-text-field
                  v-model="establishment"
                  append-icon="search"
                  :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.header_list.establishment')"
                  single-line
                  return-object
                  hide-details
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md4 d-flex>
                <v-text-field
                  v-model="variety"
                  append-icon="search"
                  :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.variety')"
                  single-line
                  return-object
                  hide-details
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md4 d-flex>
                <v-autocomplete
                  v-model="stateSelected"
                  item-text="descripcion"
                  item-value="id"
                  :items="states"
                  attach
                  return-object
                  :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.header_list.state')"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 md1 d-flex class="text-xl-right">
                <v-btn class="primary" @click="trowPagination()">Buscar</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="dataFilter"
          :pagination.sync="pagination"
          :total-items="this.totalDataFilter"
          :loading="loading"
          class="elevation-1"
          :rows-per-page-text="this.$i18n.t('applications.onei_ipc.components.table.dataTable.rowsPerPageText')"
          :rows-per-page-items="pageItems"
        >
          <template slot="items" slot-scope="props">
            <td>{{props.item.stateDescripcion}}</td>
            <td>{{props.item.variedadDescripcion}}</td>

            <td>{{props.item.establecimientoDescripcion}}</td>
            <td>{{ props.item.mercadoDescripcion}}-{{
              props.item.monedaDescripcion}}
            </td>
            <td>{{props.item.dpaDescripcion}}</td>
            <td> {{props.item.dayPlanning1}} {{props.item.dayPlanning2}} {{props.item.dayPlanning3}}  {{props.item.dayPlanning4}}</td>
            <td>{{props.item.unidadMedidaDescripcion}}</td>
            <td class="text-md-center justify-center layout px-0">
              <v-menu bottom
                      origin="center center"
                      transition="scale-transition">
                <v-btn slot="activator" icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile :to="`/onei/sigip/ipc/variedadEstablecimiento/editar/${props.item.listIdVarEstab[0]}`">
                    <v-list-tile-action>
                      <v-icon>edit</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                      {{$t('applications.onei_ipc.modules.variedadEstablecimiento.pages.list_variedad_establecimiento.action_list.edit')}}
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile :to="`/onei/sigip/ipc/variedadEstablecimiento/visualizar/${props.item.listIdVarEstab[0]}`">
                    <v-list-tile-action>
                      <v-icon>visibility</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                      {{$t('applications.onei_ipc.modules.variedadEstablecimiento.pages.list_variedad_establecimiento.action_list.view')}}
                    </v-list-tile-title>
                  </v-list-tile>
                  <!--v-list-tile @click="showDialog(props.item.id)">
                    <v-list-tile-action>
                        <v-icon>delete</v-icon>
                      </v-list-tile-action>
                    <v-list-tile-title>{{$t('applications.onei_ipc.modules.variedadEstablecimiento.pages.list_variedad_establecimiento.action_list.delete')}}</v-list-tile-title>
                  </v-list-tile-->
                  <v-list-tile @click="setState(props.item.listIdVarEstab[0], props.item.varietyEstablishment.state.id)">
                    <v-list-tile-action>
                      <v-icon>{{props.item.stateDescripcion == 'Alta' ?'thumb_down_alt':'thumb_up_alt'}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Dar de {{ $t('applications.onei_ipc.modules.establecimiento.fields.'+
                      props.item.stateDescripcion) }}
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
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script lang="ts">
  import VAlert from "@vuetify/components/VAlert"
  import VBtn from "@vuetify/components/VBtn";
  import LoadingDialog from "@shared/components/loading-dialog/loading-dialog.vue";
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
  import VAutocomplete from "@vuetify/components/VAutocomplete";
  import VTextField from "@vuetify/components/VTextField";
  import {VToolbar, VToolbarTitle} from "@vuetify/components/VToolbar";
  import VTooltip from "@vuetify/components/VTooltip";
  import gql from 'graphql-tag';
  import {
    DELETE_ESTABLISHMENT_MUTATION,
    QUERY_GET_DPA_RESOURCE,
    QUERY_GET_ESTABLISHMENT,
    QUERY_GET_ESTABLISHMENT_PAGING,
    QUERY_GET_MARKETS,
    QUERY_GET_STATE,
    QUERY_GET_TYPOLOGIES
  } from "../../components/establecimiento/graphql/graphql-nomenclador.js";
  import {
    DELETE_VARIETY_ESTABLISHMENT,
    FILTER_VARIETY_ESTABLISHMENT_RESOURCE,
    SET_ACTIVE,
    SET_STATE,
    TOTAL_FILTER_VARIETY_ESTABLISHMENT,
    VARIETY_ESTABLISHMENT_PAGING
  } from "../../components/variedadEstablecimiento/graphql/graphql.js";
  import NoFoundResult from "@shared/components/no-found-result/no-found-result.vue";

  export default {
    name: "onei-variedad-establecimiento-list",
    components: {
      NoFoundResult,
      VAutocomplete,
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
      LoadingDialog
    },
    data() {
      return {
        linear_active: false,
        pageItems: [5, 10, 25],
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
        establishments: [],
        typologySelected: {id: -1, description: "Seleccione"},
        marketSelected: {id: -1, description: "Seleccione"},
        dpaSelected: {id: -1, description: "Seleccione"},
        establishment: '',
        states: [],
        stateSelected: {id: -1, descripcion: "Seleccione"},
        totalDataFilter: 0,
        address: '',
        variety: '',
        flagMarketSelected: false,
        flagTypologySelected: false,
        flagDpaSelected: false,
        flagEstablishmentSelected: false,
        flagSateSelected: false,
        flagVarietySelected: false
      }
    },
    computed: {
      total() {
        return  this.totalDataFilter ;
      },
      dpa(c: string, d: string) {
        return c + " - " + d;
      }
    },
    apollo: {
      typologies: {
        query: QUERY_GET_TYPOLOGIES,
        update(data) {
          const datos = new Array()
          datos.push(this.typologySelected)
          data.typologies.forEach(element => {
            datos.push(element)
          });
          return datos;
        }
      },
      markets: {
        query: QUERY_GET_MARKETS,
        update(data) {
          const datos = new Array()
          datos.push(this.marketSelected)
          data.marketsCurrencies.forEach(element => {
            datos.push(element)
          });
          return datos;
        }
      },
      dpas: {
        query: QUERY_GET_DPA_RESOURCE,
        update(data) {
          const datos = new Array()
          datos.push(this.dpaSelected)
          data.findAllDPAResource.forEach(element => {
            datos.push(element)
          });
          return datos;
        }
      },
      states: {
        query: QUERY_GET_STATE,
        update(data) {
          const datos = new Array()
          datos.push(this.stateSelected)
          data.allStates.forEach(element => {
            datos.push(element)
          });
          return datos;
        }
      },
      dataFilter: {
        query: FILTER_VARIETY_ESTABLISHMENT_RESOURCE,
        variables: {
          marketId: -1,
          typologyId: -1,
          dpaId: -1,
          establishment: "",
          variety: "",
          stateId: -1,
          page: 0,
          size: 5
        },
        update(data) {
          this.loading = false;
          this.dataTable = data.filterVarietyEstablishmentResource;
          return data.filterVarietyEstablishmentResource
        },
      },
      totalDataFilter: {
        query: TOTAL_FILTER_VARIETY_ESTABLISHMENT,
        variables: {
          marketId: -1,
          typologyId: -1,
          dpaId: -1,
          establishment: "",
          variety: "",
          stateId: -1,
          page: 0,
          size: 5
        },
        update(data) {
          return data.totalVarietyEstablishmentByFilter
        },
      }
    },
    watch: {

      pagination: {
        handler(): any {
          return this.getDataFromApi();
        }
      },
      marketSelected() {
        this.flagMarketSelected = this.marketSelected.id != -1
      },
      typologySelected() {
        this.flagTypologySelected = this.typologySelected.id != -1
      },
      dpaSelected() {
        this.flagDpaSelected = this.dpaSelected.id != -1
      },
      establishment() {
        this.flagEstablishmentSelected = this.establishment != ""
      },
      stateSelected() {
        this.flagSateSelected = this.stateSelected.id != -1
      },
      variety() {
        this.flagVarietySelected = this.variety != ""
      }

    },
    created() {
      this.$apollo.queries.typologies.refetch()
      this.$apollo.queries.markets.refetch()
      this.$apollo.queries.dpas.refetch()
      this.$apollo.queries.states.refetch()
      this.initialize()
    },
    methods: {
      trowPagination() {
        this.loading = true;
        this.search = this.flagMarketSelected || this.flagTypologySelected || this.flagDpaSelected || this.flagEstablishmentSelected || this.flagSateSelected || this.flagVarietySelected
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
                "applications.onei_ipc.modules.variedadEstablecimiento.pages.list_variedad_establecimiento.header_list.state"
              )
              .toString(),
            value: "state"
          },
          {
            align: "left",
            sortable: false,
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.variedadEstablecimiento.pages.list_variedad_establecimiento.header_list.variety"
              )
              .toString(),
            value: "active"
          },
          {
            align: "left",
            sortable: false,
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.variedadEstablecimiento.pages.list_variedad_establecimiento.header_list.establishment"
              )
              .toString(),
            value: "active"
          },
          {
            align: "left",
            sortable: false,
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.variedadEstablecimiento.pages.list_variedad_establecimiento.header_list.market"
              )
              .toString(),
            value: "active"
          },
          {
            align: "left",
            sortable: false,
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.variedadEstablecimiento.pages.list_variedad_establecimiento.header_list.dpa"
              )
              .toString(),
            value: "active"
          },
          {
            align: "left",
            sortable: false,
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.variedadEstablecimiento.pages.list_variedad_establecimiento.header_list.date"
              )
              .toString(),
            value: "active"
          },
          {
            align: "left",
            sortable: false,
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.variedadEstablecimiento.pages.list_variedad_establecimiento.header_list.um"
              )
              .toString(),
            value: "active"
          },
          {
            align: "left",
            sortable: false,
            text: this.$i18n
              .t(
                "applications.onei_ipc.modules.variedadEstablecimiento.pages.list_variedad_establecimiento.header_list.actions"
              )
              .toString(),
            value: "active"
          },

        ];
      },
      getDataFromApi() {
        this.loading = true;
        const {sortBy, descending, page, rowsPerPage} = this.pagination
        const pagina = page - 1

        this.$apollo.queries.dataFilter.refetch({
          marketId: this.marketSelected.id,
          typologyId: this.typologySelected.id,
          dpaId: this.dpaSelected.id,
          establishment: this.establishment,
          variety: this.variety,
          stateId: this.stateSelected.id,
          page: pagina,
          size: rowsPerPage
        })
        this.$apollo.queries.totalDataFilter.refetch({
          marketId: this.marketSelected.id,
          typologyId: this.typologySelected.id,
          dpaId: this.dpaSelected.id,
          establishment: this.establishment,
          variety: this.variety,
          stateId: this.stateSelected.id,
          page: pagina,
          size: rowsPerPage
        })

      },
      aceptConfirm() {
        const result = this.$apollo.mutate({
          mutation: DELETE_VARIETY_ESTABLISHMENT,
          variables: {
            id: this.idCurrent
          }
        }).then((data) => {
          this.$store.dispatch('showMessage', {
            message: this.$i18n.t("applications.onei_ipc.modules.variedadEstablecimiento.messages.delete_success "),
            type: 'success'
          })
          // Result
          // console.log(data)
          this.dialog = false
          // reset dataTable
          this.trowPagination()
        }).catch((error) => {
          this.$store.dispatch('showMessage', {
            message: this.$i18n.t("applications.onei_ipc.modules.variedadEstablecimiento.messages.delete_error "),
            type: 'error'
          })
          console.error(error)
        })
      },
      showDialog(id) {
        this.idCurrent = id
        this.dialog = true
      },
      setState(idVarietyStab, idstate) {
        const result = this.$apollo.mutate({
          mutation: SET_STATE,
          variables: {
            idstate,
            idVarietyStab
          }
        }).then((data) => {
          // reset dataTable
          alert("Se ha dado correctamente de Alta o Baja al establecimiento")
          this.trowPagination()
        }).catch((error) => {
          // Error
          console.error(error)
          alert("Hubo un error al dar de Alta o Baja al establecimiento")
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>

</style>
