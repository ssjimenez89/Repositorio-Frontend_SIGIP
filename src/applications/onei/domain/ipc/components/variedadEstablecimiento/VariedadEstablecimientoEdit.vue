<template>
  <v-card class="add_container">
    <v-layout row>
      <loading-dialog v-model="$apollo.queries.varietyEstablishment.loading"
                      message="Cargando Modificar variedad establecimiento">

      </loading-dialog>
      <v-flex xs12>
        <v-card class="card--flex-toolbar">
          <v-toolbar card color="primary" dark>
            <v-toolbar-title class="subheading">
              {{$t('applications.onei_ipc.modules.variedadEstablecimiento.pages.edit_variedad_establecimiento.form_title')}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-container fluid grid-list-xl>
              <v-layout wrap>
                <v-flex d-flex md4 xs12>
                  <v-select
                    :items="dpas"
                    :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.dpa')"
                    disabled=""
                    item-text="description"
                    item-value="id"
                    return-object
                    v-model="dpaSelected"
                  ></v-select>
                </v-flex>
                <v-flex d-flex md4 xs12>
                  <v-select
                    :items="markets"
                    :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.market')"
                    disabled=""
                    item-text="description"
                    item-value="id"
                    return-object
                    v-model="marketSelected"
                  ></v-select>
                </v-flex>
                <v-flex d-flex md4 xs12>
                  <v-select
                    :items="typologies"
                    :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.typology')"
                    disabled=""
                    item-text="description"
                    item-value="id"
                    return-object
                    v-model="typologySelected"
                  ></v-select>
                </v-flex>
                <v-flex d-flex md4 xs12>
                  <v-select
                    :items="establishments"
                    :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.establishment')"
                    disabled=""
                    item-text="description"
                    item-value="id"
                    return-object
                    v-model="establishmentSelected"
                  ></v-select>
                </v-flex>
                <v-flex d-flex md8 xs12>
                  <v-select
                    :items="varieties"
                    :label="this.$i18n.t('applications.onei_ipc.modules.variedadEstablecimiento.fields.varieties')"
                    disabled=""
                    v-model="varietySelected"
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex md12 xs12>
                 <v-card flat v-if="showCharact">
                  <characteristic-list :specificSelectedByCharact="variety_charact_specific"  :varietyId="varietyId" :market-id="this.marketId"
                                       :planning-id="this.planningId" :planning-id2="this.planningId2" :unidadmedida-id="this.unidadmedidaId" :cantidad-id="this.cantidadId" :disable="this.disable">

                  </characteristic-list>
                 </v-card>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex md12 xs12>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      @click="submit()"
                      color="primary"
                    >
                      Guardar
                    </v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>


</template>

<script lang="ts">
  import {VToolbar, VToolbarTitle} from "@vuetify/components/VToolbar";
  import VDivider from "@vuetify/components/VDivider";
  import VAlert from "@vuetify/components/VAlert"
  import VBtn from "@vuetify/components/VBtn";
  import LoadingDialog from "@shared/components/loading-dialog/loading-dialog.vue";
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
  import VSelect from "@vuetify/components/VSelect";
  import VTextField from "@vuetify/components/VTextField";
  import VTooltip from "@vuetify/components/VTooltip";
  import CharacteristicList from "../../components/caracteristica/CaracteristicaList.vue";
  import {
    EDIT_VARIETY_ESTABLISHMENT,
    VARIETY_ESTABLISHMENT_BY_ID,
    VARIETY_ESTABLISHMENT_RESOURCE_BY_ID
  } from "../../components/variedadEstablecimiento/graphql/graphql.js";

  export default {
    name: "onei-variedad-establecimiento-list",
    props: ['id'],
    components: {
      VToolbar,
      VToolbarTitle,
      VDivider,
      CharacteristicList,
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
      LoadingDialog,
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
      VSelect
    },
    data() {
      return {
        varietyId: '',
        showCharact: false,
        dpas: [],
        typologies: [],
        markets: [],
        establishments: [],
        typologySelected: '',
        marketSelected: '',
        marketId: 0,
        dpaSelected: '',
        establishmentSelected: '',
        varieties: [],
        varietySelected: '',
        variety_charact_specific: [],
        planningId: 0,
        planningId2: 0,
        unidadmedidaId: 0,
        cantidadId: 0,
        disable: false,
        loading: true,
      }
    },
    apollo: {
      varietyEstablishment: {
        variables() {
          return {
            id: this.id
          }
        },
        query: VARIETY_ESTABLISHMENT_RESOURCE_BY_ID,
        update(data) {
          this.loading = false;
          return data.varietyEstablishmentResourceByid;
        },
        result({data, loading, networkStatus}) {
          this.dpas = [`${data.varietyEstablishmentResourceByid.varietyEstablishment.establishment.dpa.code}-${data.varietyEstablishmentResourceByid.varietyEstablishment.establishment.dpa.description}`];
          this.dpaSelected = `${data.varietyEstablishmentResourceByid.varietyEstablishment.establishment.dpa.code}-${data.varietyEstablishmentResourceByid.varietyEstablishment.establishment.dpa.description}`;
          this.markets = [`${data.varietyEstablishmentResourceByid.varietyEstablishment.establishment.market.market.description}-${data.varietyEstablishmentResourceByid.varietyEstablishment.establishment.market.currency.description}`];
          this.marketSelected = `${data.varietyEstablishmentResourceByid.varietyEstablishment.establishment.market.market.description}-${data.varietyEstablishmentResourceByid.varietyEstablishment.establishment.market.currency.description}`;
          this.marketId = data.varietyEstablishmentResourceByid.varietyEstablishment.establishment.market.id;
          this.typologies = [data.varietyEstablishmentResourceByid.varietyEstablishment.establishment.typology.description];
          this.typologySelected = data.varietyEstablishmentResourceByid.varietyEstablishment.establishment.typology.description;
          this.establishments = [data.varietyEstablishmentResourceByid.varietyEstablishment.establishment.name];
          this.establishmentSelected = data.varietyEstablishmentResourceByid.varietyEstablishment.establishment.name;
          this.varieties = [data.varietyEstablishmentResourceByid.varietyEstablishment.varietyCharactSpecifics[0].classifier.description];
          this.varietySelected = data.varietyEstablishmentResourceByid.varietyEstablishment.varietyCharactSpecifics[0].classifier.description;
          this.varietyId = data.varietyEstablishmentResourceByid.varietyEstablishment.varietyCharactSpecifics[0].classifier.id;
          this.variety_charact_specific = data.varietyEstablishmentResourceByid.varietyEstablishment.varietyCharactSpecifics;
          this.planningId = data.varietyEstablishmentResourceByid.dayPlanning1Id1;
          this.planningId2 = data.varietyEstablishmentResourceByid.dayPlanning1Id2;
          this.unidadmedidaId = data.varietyEstablishmentResourceByid.varietyEstablishment.unidadMedida.id;
          this.cantidadId = data.varietyEstablishmentResourceByid.varietyEstablishment.cantidad.id;
          this.showCharact = true;
        },
        fetchPolicy: 'network-only',
      },
    },
    watch: {},
    methods: {
      submit() {
        var characteristicsSpecifications = this.$store.getters["@onei.ipc/getCharacteristicsSpecifications"];
        var planning1 = this.$store.getters["@onei.ipc/getPlanning1"];
        var planning2 = this.$store.getters["@onei.ipc/getPlanning2"];
        var unidadMedida = this.$store.getters["@onei.ipc/getUnidadMedida"];
        var cantidad = this.$store.getters["@onei.ipc/getCantidad"];

        this.$apollo.mutate({
          mutation: EDIT_VARIETY_ESTABLISHMENT,
          variables: {
            id: this.$route.params.id,
            charactSpecificVariety: characteristicsSpecifications,
            planningListId: [planning1, planning2 ],
            unidadMedidaId: unidadMedida,
            cantidadId: cantidad,
          }
        }).then((data) => {
          this.$store.dispatch('showMessage', {
            message: this.$i18n.t("applications.onei_ipc.modules.variedadEstablecimiento.messages.edit_success "),
            type: 'success'
          });
          this.$router.push('/onei/sigip/ipc/variedadEstablecimiento')
        }).catch((error) => {
          this.$store.dispatch('showMessage', {
            message: this.$i18n.t("applications.onei_ipc.modules.variedadEstablecimiento.messages.edit_error "),
            type: 'error'
          });
          console.error(error)
        })
      }

    },
    destroyed() {
      this.$store.commit("@onei.ipc/resetStore")
    }
  }
</script>
<style lang="stylus" scoped>

</style>
