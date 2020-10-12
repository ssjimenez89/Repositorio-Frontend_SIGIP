<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-form
    ref="ClasificadorForm"
  >
    <v-container fluid>
      <v-layout row align-center justify-center>
        <v-flex md11 offset-md1 sm12 xs12>
          <v-card class="elevation-15">
            <v-card-title class="primary white--text subheading">{{`${actionType} ${nodeType}`}}
            </v-card-title>
            <v-card-title class="body-2 font-weight-bold">{{`Código: ${generateCode}`}}</v-card-title>
            <v-card-text class="pt-0">
              <v-text-field
                :rules="rules.descripcion"
                :value="data.description"
                class="pt-0 mt-0"
                clearable
                label="Nombre"
                v-model="ClasificadorForm.description"
              ></v-text-field>
              <div v-if="(data.level >= 5 && !data.id) || (data.level === 6 && data.id)">
                <v-select
                  :rules="rules.seleccionar"
                  :items="variedades"
                  v-model="ClasificadorForm.varietyType"
                  clearable
                  item-text="description"
                  item-value="id"
                  label="Tipo de variedad"
                  persistent-hint
                  return-object
                  attach
                  single-line
                ></v-select>
                <v-select
                  :rules="rules.seleccionar"
                  :items="mercados"
                  v-model="ClasificadorForm.marketCurrencies"
                  multiple
                  clearable
                  item-value="id"
                  item-text="description"
                  label="Mercado"
                  persistent-hint
                  return-object
                  attach
                  chips
                  deletable-chips
                  single-line
                ></v-select>
              </div>
            </v-card-text>
          </v-card>

        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex md11 offset-md1 sm12 xs12>
          <v-card class="elevation-15" v-if="(data.level <= 5) || (data.level === 5 && data.action !== 'add')">
            <v-card-title class="primary white--text subheading">Ponderaciones</v-card-title>
            <v-card-title>
              <v-flex md12 sm12 xs12>
                <v-select
                  :items="monedas"
                  @click:clear="$nextTick(() => tablePonderacion.currency=defaultMoneda)"
                  clearable
                  dense
                  item-text="description"
                  item-value="id"
                  label="Moneda"
                  return-object
                  single-line
                  attach
                  v-model="tablePonderacion.currency"
                ></v-select>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex md12 sm12 xs12>
                <v-select
                  :items="tipoPonderacion"
                  @click:clear="$nextTick(() => tablePonderacion.weighingType=defaultPonderacion)"
                  clearable
                  dense
                  item-value="id"
                  item-text="description"
                  label="Ponderación"
                  persistent-hint
                  return-object
                  single-line
                  attach
                  v-model="tablePonderacion.weighingType"
                ></v-select>
              </v-flex>
              <v-flex md12 sm12 xs12>
                <v-text-field clearable label="Valor" required v-model="tablePonderacion.value"></v-text-field>
              </v-flex>
              <v-flex md12 sm12 xs12>
                <v-btn :disabled="ponderaciones.length === totalCombination() || validCombination() || validSelection()"
                       @click="addPonderacion()"
                       class="saveButton"
                       color="primary">Adicionar ponderación
                </v-btn>
              </v-flex>
              <v-flex class="pt-4" md12 sm12 xs12>
                <v-data-table :headers="headers" :items="ponderaciones" class="elevation-1" hide-actions>
                  <template v-slot:items="props">
                    <td class="text-xs-center">{{ props.item.value }}</td>
                    <td class="text-xs-center">{{ props.item.currency.acronym }}</td>
                    <td class="text-xs-center">{{ props.item.weighingType.description }}</td>
                    <td class="text-xs-center">
                      <v-btn color="red" flat icon>
                        <v-icon
                          @click="deleteItem(props.item)"
                          small
                        >
                          delete
                        </v-icon>
                      </v-btn>
                    </td>
                  </template>
                </v-data-table>
              </v-flex>
            </v-card-title>
          </v-card>
          <v-card class="elevation-15" v-else>
            <v-card-title class="primary white--text subheading">Características-Especificaciones</v-card-title>
            <v-card-title>
              <v-container grid-list-xl fluid>
                <v-layout wrap align-center justify-center>
                  <v-flex md6 sm12 xs12 d-flex>
                    <autocomplete-generic-filed
                      label="Características"
                      :query="query"
                      identificador="id"
                      filter-by="description"
                      text="description"
                      data-name="charateristicByDescriptionContaining"
                      @change="selectCaracteristica($event)"
                    ></autocomplete-generic-filed>
                  </v-flex>
                  <v-flex md6 sm12 xs12 d-flex>
                    <v-text-field
                      v-model="searchEspecificaciones"
                      append-icon="search"
                      clearable
                      label="Nombre"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-flex class="pt-4" md12 sm12 xs12>
                <v-data-table
                  v-model="selected"
                  :headers="headersCaracteristica"
                  :items="especificaciones"
                  :search="searchEspecificaciones"
                  select-all
                  item-key="description"
                  class="elevation-1"
                >
                  <template v-slot:headers="props">
                    <tr>
                      <th>
                        <v-checkbox
                          disabled
                          primary
                          hide-details
                        ></v-checkbox>
                      </th>
                      <th
                        v-for="header in headersCaracteristica"
                        :key="header.text"
                      >
                        {{ header.text }}
                      </th>
                    </tr>
                  </template>
                  <template v-slot:items="props">
                    <tr :active="props.selected" @click="props.selected = !props.selected">
                      <td>
                        <v-checkbox
                          :input-value="props.selected"
                          primary
                          hide-details
                        ></v-checkbox>
                      </td>
                      <td class="text-xs-center">{{ props.item.description }}</td>
                      <td class="text-xs-center">{{ props.item.active }}</td>
                    </tr>
                  </template>
                </v-data-table>
              </v-flex>
              <v-layout>
                <v-flex>
                  <v-card>
                    <v-card-title>
                      <h4>Nuevas especificaciones para adicionar a la variedad:</h4>

                      <v-chip
                        v-for="(item,index) in specifics"
                        :key="index"
                        @input="remove(index,item)"
                        close
                      >
                        <span>{{ item.description }}</span>&nbsp;
                        <strong>{{`(${item.characteristic.description})`}}</strong>
                      </v-chip>

                    </v-card-title>
                    <v-card-title style="float: right">
                      <v-btn
                        :disabled="validEspecificacion()"
                        @click="addEspecificaciones()"
                        class="saveButton"
                        color="success">
                        Adicionar Especificaciones
                      </v-btn>

                      <v-layout row justify-center>
                        <v-dialog v-model="dialog" max-width="690" persistent>
                          <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark v-on="on">Detalles</v-btn>
                          </template>
                          <v-card>
                            <v-toolbar dark color="primary">
                              <v-toolbar-title>Características-Especificaciones</v-toolbar-title>
                              <v-spacer></v-spacer>
                              <v-toolbar-items>
                                <v-btn icon dark @click="dialog = false">
                                  <v-icon>close</v-icon>
                                </v-btn>
                              </v-toolbar-items>
                            </v-toolbar>
                            <v-list three-line subheader>
                              <v-card-text>
                                <v-expansion-panel
                                  focusable
                                  expand
                                  v-model="panel"
                                >

                                  <v-expansion-panel-content
                                    v-for="(item,i) in buildCaractEspecArray"
                                    :key="i"
                                  >
                                    <template v-slot:header>
                                      <strong>{{item.caracteristica.description}}</strong>
                                    </template>
                                    <v-card>
                                      <v-card-text>
                                        <v-item-group multiple>
                                          <v-container fluid>
                                            <v-layout row wrap>
                                              <v-item
                                                v-for="(esp,index) in item.especificaciones"
                                                :key="index"
                                              >
                                                <v-switch
                                                  :label="`${esp.description.toString()}`"
                                                  :value="true"
                                                  :input-value="esp.active_variedadCaraEsp"
                                                  @change="toggle(index, $event !== null, esp)"
                                                >
                                                </v-switch>
                                              </v-item>
                                            </v-layout>
                                          </v-container>
                                        </v-item-group>
                                      </v-card-text>
                                    </v-card>
                                  </v-expansion-panel-content>
                                </v-expansion-panel>
                              </v-card-text>
                            </v-list>
                          </v-card>
                        </v-dialog>
                      </v-layout>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn @click="send()" class="saveButton" :disabled="validFormulario()" color="success">Guardar</v-btn>
  </v-form>
</template>

<script lang="ts">
  import {
    IClassifierInput,
    IComboCombination,
    IMoneda,
    IPonderacion,
    IPonderacionTable
  } from "@onei/applications/onei/domain/ipc/components/clasificador/interfaces/ITreeView";
  import {QUERY_GET_WEIGHINGTYPE_PAGING} from "@onei/applications/onei/domain/ipc/components/nomenclador/graphql/graphql-nomenclador";
  import AutocompleteGenericFiled from "@shared/components/auto-complete-generic-field/auto-complete-generic-field";
  import GenericNomenclador from "@shared/components/generic_nomenclador_select/generic-nomenclador-select";
  import {
    GET_CLASIFICADOR_QUERY,
    GET_CURRENCIES_QUERY,
    GET_VARIETY_TYPE_QUERY,
    GET_WEIGHING_TYPE_QUERY,
    MANAGE_CLASSIFIER_MUTATION
  } from "@shared/graphql/queries";
  import {GET_CHARACTERISTICS_DESCRIPTION_CONTAINING} from "@shared/graphql/queries/caracteristicas";
  import {GET_MARKETS_CURRENCIES_QUERY} from "@shared/graphql/queries/mercadoMoneda";
  import {VScrollYTransition} from "@vuetify/components/transitions";
  import VBtn from "@vuetify/components/VBtn";
  import {VCard, VCardText, VCardTitle} from "@vuetify/components/VCard";
  import VCheckbox from "@vuetify/components/VCheckbox";
  import {VChip} from "@vuetify/components/VChip";
  import {VDataTable} from "@vuetify/components/VDataTable";
  import VDivider from "@vuetify/components/VDivider";
  import {VForm} from "@vuetify/components/VForm";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import {VIcon} from "@vuetify/components/VIcon";
  import {VItem, VItemGroup} from "@vuetify/components/VItemGroup";
  import {VSelect} from "@vuetify/components/VSelect";
  import {VSubheader} from "@vuetify/components/VSubheader";
  import {VExpansionPanel, VExpansionPanelContent} from "@vuetify/components/VExpansionPanel";
  import VTextField from "@vuetify/components/VTextField";
  import VSwitch from "@vuetify/components/VSwitch";
  import VDialog from "@vuetify/components/VDialog";
  import {VToolbar, VToolbarItems, VToolbarTitle} from "@vuetify/components/VToolbar";
  import {
    VList,
    VListTile,
    VListTileAction,
    VListTileContent,
    VListTileSubTitle,
    VListTileTitle
  } from "@vuetify/components/VList";

  import Vue from "vue";
  import Validator from "@validator/validator";
  import _ from "lodash";

  export default Vue.extend({
    name: "clasificador-add",
    components: {
      VItemGroup,
      VItem,
      VSwitch,
      VList,
      VListTile,
      VListTileAction,
      VListTileContent,
      VListTileTitle,
      VListTileSubTitle,
      VToolbar,
      VToolbarTitle,
      VToolbarItems,
      VDialog,
      VExpansionPanel,
      VExpansionPanelContent,
      VChip,
      VSubheader,
      VItemGroup,
      VItem,
      VCheckbox,
      AutocompleteGenericFiled,
      VFlex,
      VLayout,
      VCard,
      VCardText,
      VCardTitle,
      VScrollYTransition,
      VForm,
      VSpacer,
      VDivider,
      VTextField,
      VContainer,
      VDataTable,
      VBtn,
      VSelect,
      VIcon,
      GenericNomenclador
    },
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    mounted() {
      if (this.ClasificadorForm.varietyCharactSpecifics) {
        this.buildCaractEspec();
        if (this.buildCaractEspecArray)
          this.panel = [...Object.keys(this.buildCaractEspecArray)].map(_ => true)
      }
    },
    created() {
    },
    data() {
      const defaultClasificadorForm: IClassifierInput = {
        id: this.data.id || -1,
        description: this.data.description || "",
        action: this.data.action,
        code: "",
        parent: this.data.id || -1,
        idclassifierType: this.data.idclassifierType || -1,
        weights: this.data.classifierWeighings || [],
        marketCurrencies: this.data.marketCurrencies || [],
        varietyType: this.data.varietyType || -1,
        varietyCharactSpecifics: this.data.varietyCharactSpecificsActives || [],
        specifics: []

      };
      const defaultMoneda: IMoneda = {id: -1, acronym: "", description: ""};
      const defaultPonderacion: IPonderacion = {id: -1, description: ""};
      const defaultTablePonderacion: IPonderacionTable = {
        value: null,
        currency: defaultMoneda,
        weighingType: defaultPonderacion
      };
      return {
        validClasificadorForm: false,
        specifics: [],
        dialog: false,
        defaultMoneda,
        defaultClasificadorForm,
        defaultPonderacion,
        defaultTablePonderacion,
        buildCaractEspecArray: [],
        ClasificadorForm: Object.assign({}, defaultClasificadorForm),
        tablePonderacion: Object.assign({}, defaultTablePonderacion),
        ponderaciones: [],
        rules: {
          descripcion: [(val: any) => {
            return Validator.of(val).required().validate;
          }],
          seleccionar: [
            (val: any) => {
              return Validator.of(val).requiredSelected().validate;
            }
          ]
        },
        searchEspecificaciones: "",
        panel: [],

        query: {
          query: GET_CHARACTERISTICS_DESCRIPTION_CONTAINING,
          variables: {
            description: "null"
          }
        },

        monedas: [],
        tipoPonderacion: [],
        mercados: [],
        variedades: [],
        selected: [],
        especificaciones: [],
        headers: [
          {align: "center", text: "Valor", value: "valor", sortable: false},
          {align: "center", text: "Moneda", value: "moneda", sortable: false},
          {
            align: "center",
            text: "Ponderación",
            value: "ponderacion",
            sortable: false
          },
          {text: 'Acciones', value: 'acciones', sortable: false},
        ],
        headersCaracteristica: [
          {text: 'Descripción', value: 'description', align: "left", sortable: false, filterable: true},
          {text: 'Activo', value: 'active', align: "left", sortable: false, filterable: false}
        ]
      };
    },
    apollo: {
      monedas: {
        query: GET_CURRENCIES_QUERY,
        loading: true,
        update: data => data.currencies,
      },
      tipoPonderacion: {
        query: GET_WEIGHING_TYPE_QUERY,
        loading: true,
        update: data => data.weighingTypes,
      },
      mercados: {
        query: GET_MARKETS_CURRENCIES_QUERY,
        loading: true,
        update: data => data.marketsCurrencies,
      },
      variedades: {
        query: GET_VARIETY_TYPE_QUERY,
        loading: true,
        update: data => data.varietyTypes,
      },

    },
    computed: {
      nodeType(): string {
        if (this.data.action) {
          return this.getNodeTypeorCode(++this.data.level);
        } else {
          return this.getNodeTypeorCode(this.data.level);
        }
      },
      actionType(): string {
        this.ponderaciones = (!this.data.action && this.data.classifierWeighings != null) ? [...this.data.classifierWeighings] : [];
        return !this.data.action ? "Modificar" : "Registrar";
      },
      generateCode(): any {
        if (this.data.action) {
          if (this.data.childrens.length > 0) {
            const lastPosition = this.data.childrens.length - 1;
            const lastcode = this.data.childrens[lastPosition].code;
            const splitsCode = lastcode.split(".");
            const number = parseInt(splitsCode[splitsCode.length - 1], 10) + 1;
            this.ClasificadorForm.code = (this.data.code === "0") ? this.data.code.concat(`${number}`) : this.data.code.concat(`.${number}`);
          } else {
            this.ClasificadorForm.code = `${this.data.code}.1`
          }
        } else {
          this.ClasificadorForm.code = `${this.data.code}`
        }
        return this.ClasificadorForm.code;
      }
    },
    methods: {
      toggle(index, value, event): any {
        event.active_variedadCaraEsp = value;
        this.ClasificadorForm.varietyCharactSpecifics = [...this.ClasificadorForm.varietyCharactSpecifics.map(el => {
          if (el.id === event.id_variedadCaraEsp) {
            el = {...el, active: value};
          }
          return {...el}
        })
        ]
      },
      buildCaractEspec(): any {
        this.buildCaractEspecArray = [...this.ClasificadorForm.varietyCharactSpecifics.reduce((acc, current) => {
          const x = acc.find(item => {
            return item.caracteristica.id === current.specification.characteristic.id
          });
          if (!x) {
            return acc.concat([{
              "caracteristica": {...current.specification.characteristic},
              "especificaciones": [{
                ...current.specification,
                active_variedadCaraEsp: current.active,
                id_variedadCaraEsp: current.id
              }]
            }]);
          } else {
            let number = acc.findIndex(el => {
              return el.caracteristica.id === current.specification.characteristic.id;
            });
            acc[number].especificaciones.push({
              ...current.specification,
              active_variedadCaraEsp: current.active,
              id_variedadCaraEsp: current.id
            })
            return acc;
          }

        }, [])];
      },
      addEspecificaciones(): void {
        this.specifics = [...this.selected];
      },
      selectCaracteristica($event) {
        this.especificaciones = [...$event.specifications]
      },
      addPonderacion(): any {
        const elmPonderacion = Object.assign({}, this.tablePonderacion);
        this.ponderaciones.push(elmPonderacion);
        const weights = this.ponderaciones.map(el => {
          return {
            "value": el.value,
            "weighingType": el.weighingType.id,
            "currency": el.currency.id
          }
        });
        this.ClasificadorForm.weights = weights;
      },
      deleteItem(item): void {
        this.$swal.fire({
          title: 'Desea eliminar la ponderación?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {
            const index = this.ponderaciones.indexOf(item);
            this.ponderaciones.splice(index, 1)
          }
        })
      },
      validSelection() {
        return !(this.tablePonderacion.weighingType.id != -1 && this.tablePonderacion.currency.id != -1 && _.toNumber(this.tablePonderacion.value))
      },
      validCombination(): any {
        const combination: IComboCombination = {
          moneda: this.tablePonderacion.currency.acronym,
          ponderacion: this.tablePonderacion.weighingType.description
        };
        return this.ponderaciones.filter(elm => combination.moneda === elm.currency.acronym &&
          combination.ponderacion === elm.weighingType.description).length > 0;
      },
      validEspecificacion(): boolean {
        if (this.ClasificadorForm.idclassifierType === 6) {
          if (this.selected.length) {
            if (this.ClasificadorForm.varietyCharactSpecifics) {
              const intersection = this.selected.filter(o => this.ClasificadorForm.varietyCharactSpecifics.find(o2 => o.id === o2.specification.id));
              return intersection.length > 0;
            }
          } else {
            return true;
          }
        }

      },
      totalCombination(): number {
        return this.monedas.length * this.tipoPonderacion.length;
      },
      getNodeTypeorCode(level: number, code: boolean = false): string {
        switch (level) {
          case 1:
            this.ClasificadorForm.idclassifierType = 1;
            return "División";
          case 2:
            this.ClasificadorForm.idclassifierType = 2;
            return "Grupo";
          case 3:
            this.ClasificadorForm.idclassifierType = 3;
            return "Clase";
          case 4:
            this.ClasificadorForm.idclassifierType = 4;
            return "Subclase";
          case 5:
            this.ClasificadorForm.idclassifierType = 5;
            return "Artículo";
          case 6:
            this.ClasificadorForm.idclassifierType = 6;
            return "Variedad";
          default: {
            return "Upps";
          }
        }
      },
      send(): any {
        const weights = this.ponderaciones.map(el => {
          return {
            "id": el.id,
            "value": el.value,
            "weighingType": el.weighingType.id,
            "currency": el.currency.id
          }
        });
        this.ClasificadorForm.marketCurrencies = this.ClasificadorForm.marketCurrencies.map(el => el.id);
        if (this.ClasificadorForm.idclassifierType === 6) {
          this.ClasificadorForm.varietyType = this.ClasificadorForm.varietyType.id;
          if (this.ClasificadorForm.varietyCharactSpecifics) {
            this.ClasificadorForm.varietyCharactSpecifics = this.ClasificadorForm.varietyCharactSpecifics.map(el => {
              return {"id": el.id, "active": el.active}
            });
          }
          if (this.ClasificadorForm.specifics) {
            this.ClasificadorForm.specifics = [...this.specifics.map(el => el.id)];
          }
        }
        this.ClasificadorForm.weights = weights;
        const input = this.ClasificadorForm;
        this.$apollo.mutate({
          mutation: MANAGE_CLASSIFIER_MUTATION,
          variables: {
            input
          },
          update: (store, {data}) => {
            if (input.action === "add") {
              data.manageClassifier.childrens = [];
              const dataquery = store.readQuery({query: GET_CLASIFICADOR_QUERY});
              dataquery.classifiers.some((elms) => {
                const result = this.searchTree(elms, data.manageClassifier.parent.id, data.manageClassifier);
                if (result) {
                  return true;
                }
              });
              // Write our data back to the cache.
              store.writeQuery({query: GET_CLASIFICADOR_QUERY, data: dataquery});
            }
          },
        }).then((result) => {
          if (result.data.manageClassifier.varietyCharactSpecificsActives) {
            this.ClasificadorForm.varietyCharactSpecifics = [...result.data.manageClassifier.varietyCharactSpecificsActives];
            this.buildCaractEspec();
            this.specifics = [];
            this.selected = [];
          }
          if (input.action === "add") {
            this.$store.dispatch('showMessage', {
              message: `Se ha adcionado el clasificador ${result.data.manageClassifier.description}`,
              type: 'success'
            });
          } else {
            this.$store.dispatch('showMessage', {
              message: `Se ha modificado el clasificador ${result.data.manageClassifier.description}`,
              type: 'success'
            });
          }
          return result;
        }).catch(error => {
          this.$store.dispatch('showMessage', {
            message: error,
            type: 'error'
          });
        });
      },
      searchTree(elements, matchingId, newElement): any {
        if (elements.id == matchingId) {
          newElement
          elements.childrens.push(newElement);
          return elements;
        } else if (elements.childrens != null) {
          let i;
          let result = null;
          for (i = 0; result == null && i < elements.childrens.length; i++) {
            result = this.searchTree(elements.childrens[i], matchingId, newElement);
          }
          return result;
        }
        return null;
      },
      remove(index, item): any {
        this.specifics.splice(index, 1)
        this.specifics = [...this.specifics];
        let number = this.selected.findIndex(el => item.id == el.id);
        this.selected.splice(number, 1);
        this.selected = [...this.selected];
      },
      validFormulario(): boolean {
        if (this.ClasificadorForm.idclassifierType === 6) {
          return !(this.ClasificadorForm.description && this.ClasificadorForm.varietyType && this.ClasificadorForm.marketCurrencies.length > 0)
        } else {
          return !(this.ClasificadorForm.description && this.ponderaciones.length > 0)
        }
      }
    },
  });
</script>

<style lang="stylus" scoped>
  .saveButton {
    float: right;
  }
</style>
