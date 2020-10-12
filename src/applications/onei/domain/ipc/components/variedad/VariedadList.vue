<template>
  <v-layout>
    <v-flex xs12 md12 d-flex>
      <div>

        <v-card-title>
          <v-container grid-list-xl fluid>
            <v-layout wrap>

              <v-flex xs12 md4 d-flex>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  :label="this.$i18n.t('applications.onei_ipc.modules.nomenclador.fields.name')"
                  single-line
                  return-object
                  hide-details
                ></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="dataTable"
          :pagination.sync="pagination"
          :total-items="total"
          :loading="loading"
          :expand="expand"
          :rows-per-page-text="this.$i18n.t('applications.onei_ipc.components.table.dataTable.rowsPerPageText')"
          :rows-per-page-items="pageItems"
        >
          <template v-slot:items="props">
            <tr>
              <td>
                <v-checkbox
                  @click="varietySelected(props.item.id)"
                  v-model="selected" :value="props.item.id" hide-details></v-checkbox>
              </td>
              <td class="text-xs-left">{{ props.item.code }}</td>
              <td class="text-xs-left">{{ props.item.description }}</td>
            </tr>
          </template>
          <template slot="pageText" slot-scope="props">
            {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
          </template>
        </v-data-table>
        <v-card flat v-if="showCharact">

          <characteristic-list :varietyId="varietyId" :market-id="marketId" :planning-id="this.planningId" :planning-id2="this.planningId2"
                               :unidadmedida-id="this.unidadmedidaId" :cantidad-id="this.cantidadId" :disable="this.disable">

          </characteristic-list>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
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
    import VCheckbox from "@vuetify/components/VCheckbox";
    import {VRadio, VRadioGroup} from "@vuetify/components/VRadioGroup";
    import {VToolbar, VToolbarTitle} from "@vuetify/components/VToolbar";
    import WaitForUserTextFiled
        from "@shared/components/wait-for-user-text-filed/wait-for-user-text-filed.vue";
    import gql from 'graphql-tag';
    import {
        QUERY_GET_VARIETY_X_MARKET,
        VARIETY_BY_ID,
        TOTAL_VARIETY_X_MARKET,
        QUERY_GET_VARIETIES_FILTRADAS_BY_MARKET,
        TOTAL_VARIETIES_FILTRADAS_BY_MARKET
    } from "../../components/variedad/graphql/graphql-variedad.js";

    import CharacteristicList from "../../components/caracteristica/CaracteristicaList.vue";

    export default {
        name: "onei-establecimiento-list",
        props: ['establishmentId', 'typologyId', 'marketId'],
        components: {
            VRadio,
            VRadioGroup,
            CharacteristicList,
            VToolbarTitle,
            VToolbar,
            VCheckbox,
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
            WaitForUserTextFiled
        },
        data() {
            return {
                pageItems: [5, 10, 25, {"text": "Todos", "value": -1}],
                totalDataTable: 0,
                dataTable: [],
                loading: true,
                pagination: {},
                headers: [],
                expand: false,
                showCharact: false,
                varietyId: '',
                selected: [],
                variety: '',
                flagVarietySelected: false,
                search: '',
                timeOut: '',
                planningId: 0,
                planningId2: 0,
                unidadmedidaId: 0,
                cantidadId: 0,
                disable: false
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
                query: QUERY_GET_VARIETY_X_MARKET,
                variables() {
                    return {
                        page: 0,
                        size: 5,
                        idmarket: this.marketId,
                        idestablishment: this.establishmentId,

                    }
                },
                update(data) {
                    return data.classifierByMarket
                }
            },
            totalDataTable: {
                query: TOTAL_VARIETY_X_MARKET,
                variables() {
                    return {
                        idmarket: this.marketId,
                        idestablishment: this.establishmentId,
                    }
                },
                update(data) {
                    return data.totalClassifierByMarket
                }
            },
            dataFilter: {
                query: QUERY_GET_VARIETIES_FILTRADAS_BY_MARKET,
                variables() {
                    return {
                        page: 0,
                        size: 5,
                        idmarket: this.marketId,
                        idestablishment: this.establishmentId,
                        descripcion: "null",
                    }
                },
                update(data) {
                    return data.variedadesFiltradasByMarket
                }
            },
            totalDataFilter: {
                query: TOTAL_VARIETIES_FILTRADAS_BY_MARKET,
                variables() {
                    return {
                        idmarket: this.marketId,
                        idestablishment: this.establishmentId,
                        descripcion: "null",
                    }
                },
                update(data) {
                    return data.totalvariedadesFiltradasByMarket
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
                            this.selected = []
                            this.showCharact = false
                            this.$store.commit("@onei.ipc/resetCharacteristics")
                        })
                }
            },
            typologyId() {
                this.pagination = {
                    page: 1,
                    rowsPerPage: this.pagination.rowsPerPage
                }
            },
            search(val) {
                    setTimeout(() => {
                        this.busqueda()
                    }, 1500);
            },
        },
        created() {
            this.initialize()
        },
        methods: {
            initialize() {
                this.headers = [
                    {
                        align: "left",
                        sortable: false,
                        text: 'Seleccione',
                        value: "active"
                    },
                    {
                        align: "left",
                        sortable: false,
                        text: this.$i18n
                            .t(
                                "applications.onei_ipc.modules.variedad.list_variedad.header_list.code"
                            )
                            .toString(),
                        value: "active"
                    },
                    {
                        sortable: false,
                        align: "left",
                        text: this.$i18n
                            .t(
                                "applications.onei_ipc.modules.variedad.list_variedad.header_list.name"
                            )
                            .toString(),
                        value: "code"
                    }
                ];
            },
            getDataFromApi() {
                this.loading = true
                if (this.search) {
                    return new Promise((resolve, reject) => {
                        const {sortBy, descending, page, rowsPerPage} = this.pagination;
                        const pagina = page - 1;
                        this.$apollo.queries.totalDataFilter.refetch({
                            idmarket: this.marketId,
                            idestablishment: this.establishmentId,
                            description: this.search
                        });
                        this.$apollo.queries.dataFilter.fetchMore({
                            variables: {
                                idmarket: this.marketId,
                                idestablishment: this.establishmentId,
                                page: pagina,
                                size: rowsPerPage,
                                description: this.search
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                const items = fetchMoreResult.variedadesFiltradasByMarket;
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
                        this.$apollo.queries.totalDataTable.refetch()
                        this.$apollo.queries.dataTable.fetchMore({
                            variables: {
                                page: pagina,
                                size: rowsPerPage
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                const items = fetchMoreResult.classifierByMarket
                                this.loading = false
                                resolve({
                                    items
                                })
                            }
                        })
                    })
                }
            },
            varietySelected(id) {
                //console.log(this.selected)
                this.selected = id
                this.varietyId = id
                this.showCharact = true
                this.varietyId = id
            },
            //Comienzan a ejecutarse las promesas después de esperar el tiempo definido
            busqueda()
            {
                this.pagination = {
                    page: 1,
                    rowsPerPage: this.pagination.rowsPerPage
                }
            }


        }
    }
</script>
<style lang="stylus" scoped>

</style>
