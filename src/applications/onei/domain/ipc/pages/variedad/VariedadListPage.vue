<template>
<v-content class="padding-top">
    <v-container>
      <v-layout justify-center align-center row>
        <v-flex xs12 md10 sm8 lg10>
          <v-toolbar card dark color="primary">
            <v-toolbar-title class="subheading">{{$t('applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.action_list.relation')}}{{establishmentName}}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card v-if="renderComponent">
            <variedad-list :establishmentId="this.$route.params.establishmentId" :typology-id="this.$route.params.typologyId" :market-id="this.marketId"></variedad-list>
            <v-flex xs12 md12>
              <v-card-actions>
                <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    @click="submit()"
                    :disabled="!save"
                  >
                    Guardar
                  </v-btn>
              </v-card-actions>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script lang="ts">
import VBtn from "@vuetify/components/VBtn";
import {VCard,VCardActions,VCardText,VCardTitle} from "@vuetify/components/VCard";
import VDivider from "@vuetify/components/VDivider";
import { VSpacer } from "@vuetify/components/VGrid";
import VContainer from "@vuetify/components/VGrid/VContainer";
import VContent from "@vuetify/components/VGrid/VContent";
import VFlex from "@vuetify/components/VGrid/VFlex";
import VLayout from "@vuetify/components/VGrid/VLayout";
import VIcon from "@vuetify/components/VIcon";
import { VToolbar, VToolbarTitle } from "@vuetify/components/VToolbar";
import VTooltip from "@vuetify/components/VTooltip";
import EstablecimientoEdit from "../../components/establecimiento/EstablecimientoEdit.vue";
import {ESTABLISHMENT_BY_ID_GET_NAME,VARIETY_ESTABLISHMENT_MUTATION, QUERY_GET_MARKETS_CURRENCIES} from "../../components/establecimiento/graphql/graphql-nomenclador.js";

import VariedadList from "../../components/variedad/VariedadList.vue";
export default {
  name: "onei-variedad-list-page",
  components: {
    VariedadList,
    EstablecimientoEdit,
    VDivider,
    VCard,
    VCardActions,
    VCardText,
    VCardTitle,
    VSpacer,
    VToolbar,
    VToolbarTitle,
    VContainer,
    VContent,
    VLayout,
    VFlex,
    VTooltip,
    VBtn,
    VIcon
  },
  data(){
    return{
      renderComponent:true,
      establishmentName:'',
      markets: [],
      marketId:  parseInt(this.$route.params.marketId)
    }
  },
  apollo:{
    establishmentName: {
      query: ESTABLISHMENT_BY_ID_GET_NAME,
      variables(){
        return{
          id:this.$route.params.establishmentId
        }
      },
      update(data) {
        return data.establishmentById.name
      }
    },

    markets:{
      query:QUERY_GET_MARKETS_CURRENCIES,
      update(data) {
        return data.marketsCurrencies
      }
    },

  },
  computed:{
    save ():boolean {
      let characteristicsSpecifications=this.$store.getters["@onei.ipc/getCharacteristicsSpecifications"];
      let totalCharactToValidate=this.$store.getters["@onei.ipc/getTotalCharactToValidate"].countCharact;
      var unidadMedida = this.$store.getters["@onei.ipc/getUnidadMedida"];
      var cantidad = this.$store.getters["@onei.ipc/getCantidad"];
      var planning1 = this.$store.getters["@onei.ipc/getPlanning1"];
      var planning2 = this.$store.getters["@onei.ipc/getPlanning2"];

      if(this.getDescription(this.marketId, this.markets) == 'Agropecuario-CUP'){
        return (characteristicsSpecifications.length == totalCharactToValidate && totalCharactToValidate > 0 && unidadMedida != 0 && cantidad != 0 && planning1 != 0 && planning2 != 0)
      }else{
        return (characteristicsSpecifications.length == totalCharactToValidate && totalCharactToValidate > 0 && unidadMedida != 0 && cantidad != 0 && planning1 != 0 )
      }
    }
  },
  methods:{
    submit(){
      // alert(this.$route.params.establishmentId)
      let characteristicsSpecifications=this.$store.getters["@onei.ipc/getCharacteristicsSpecifications"];
      var planning1 = this.$store.getters["@onei.ipc/getPlanning1"];
      var planning2 = this.$store.getters["@onei.ipc/getPlanning2"];
      var unidadMedida = this.$store.getters["@onei.ipc/getUnidadMedida"];
      var cantidad = this.$store.getters["@onei.ipc/getCantidad"];

      this.$apollo.mutate({
        mutation: VARIETY_ESTABLISHMENT_MUTATION,
          variables: {
            establishmentId:this.$route.params.establishmentId,
            stateId:1,
            varietyCharactSpecificsId:characteristicsSpecifications,
            planningListId: [planning1, planning2 ],
            unidadMedidaId: unidadMedida,
            cantidadId: cantidad,
          }
      }).then((data)=>{
        this.$store.dispatch('showMessage', {message: this.$i18n.t("applications.onei_ipc.modules.variedadEstablecimiento.messages.add_success "), type: 'success'})
        this.renderComponent = false;
        // If you like promises better you can
        // also use nextTick this way
        this.$nextTick().then(() => {
          // Add the component back in
          this.renderComponent = true;
        });
      }).catch((error) => {
        this.$store.dispatch('showMessage', {message: this.$i18n.t("applications.onei_ipc.modules.variedadEstablecimiento.messages.add_error "), type: 'error'})
        console.error(error)
      })
    },

    getDescription(id: number, data: any){

      var mercadoDescripcion = data
        .filter((data)=> data.id === id)
        .map((data)=> data.description);
      return mercadoDescripcion;
    }

  },
  head: {
    title() {
      return {
        inner: this.$i18n.t(
          "applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.action_list.relation"
        )
      };
    }
  },
  destroyed() {
    this.$store.commit("@onei.ipc/resetStore")
  }
};
</script>
<style lang="stylus" scoped>
.padding-top {
  padding: 20px 0px 0px 0px !important;
}
</style>
