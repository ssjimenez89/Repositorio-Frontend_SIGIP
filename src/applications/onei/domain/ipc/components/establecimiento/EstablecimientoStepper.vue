<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        {{$t('applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.action_list.add')}}
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">
        {{$t('applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.action_list.relation')}}
      </v-stepper-step>

    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <div>
          <establecimiento-add></establecimiento-add>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            @click="e1=2"
            :disabled="!next"
          >
            {{$t('applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.action_list.next')}}
          </v-btn>
          <v-btn
            color="error"
            to="/onei/sigip/ipc/establecimiento"
          >
            Cancelar
          </v-btn>
        </v-card-actions>


      </v-stepper-content>

      <v-stepper-content step="2">
        <div v-if="visible">
          <variedad-list establishmentId="-1" :typology-id="typologyId" :market-id="marketId"></variedad-list>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="e1 = 1"
                 color="primary"
          >
            {{$t('applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.action_list.previous')}}
          </v-btn>
          <v-btn
            color="success"
            @click="submit()"
            :disabled="!save"
          >
            {{$t('applications.onei_ipc.modules.establecimiento.pages.list_establecimiento.action_list.save')}}
          </v-btn>
          <v-btn
            color="error"
            to="/onei/sigip/ipc/establecimiento"
          >
            Cancelar
          </v-btn>
        </v-card-actions>


      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script lang="ts">
  import EstablecimientoAdd from "../../components/establecimiento/EstablecimientoAdd.vue";
  import VariedadList from "../../components/variedad/VariedadList.vue";
  import {VStepper, VStepperContent, VStepperStep, VStepperHeader, VStepperItems} from "@vuetify/components/VStepper";
  import VBtn from "@vuetify/components/VBtn";
  import {VCard, VCardActions, VCardText, VCardTitle} from "@vuetify/components/VCard";
  import VCheckbox from "@vuetify/components/VCheckbox";
  import VChip from "@vuetify/components/VChip";
  import VDialog from "@vuetify/components/VDialog";
  import VDivider from "@vuetify/components/VDivider";
  import VForm from "@vuetify/components/VForm";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VIcon from "@vuetify/components/VIcon";
  import VSelect from "@vuetify/components/VSelect";
  import VSlider from "@vuetify/components/VSlider";
  import VSnackbar from "@vuetify/components/VSnackbar";
  import VSubheader from "@vuetify/components/VSubheader";
  import VSystemBar from "@vuetify/components/VSystemBar";
  import VTextField from "@vuetify/components/VTextField";
  import {VToolbar, VToolbarTitle} from "@vuetify/components/VToolbar";
  import {
    ESTABLISHMENT_MUTATION,
    VARIETY_ESTABLISHMENT_MUTATION
  } from "../../components/establecimiento/graphql/graphql-nomenclador.js";
  import es from '@/core/i18n/locales/es.js';
  import {QUERY_GET_MARKETS_CURRENCIES} from "../../components/establecimiento/graphql/graphql-nomenclador";

  export default {
    name: "onei-establecimiento-stepper",
    components: {
      VariedadList,
      EstablecimientoAdd,
      VStepper,
      VStepperContent,
      VStepperStep,
      VStepperHeader,
      VStepperItems,
      VCard,
      VCardTitle,
      VCardText,
      VTextField,
      VContainer,
      VContent,
      VLayout,
      VFlex,
      VForm,
      VCardActions,
      VBtn,
      VToolbar,
      VToolbarTitle,
      VIcon,
      VSpacer,
      VDivider,
      VSnackbar,
      VSelect,
      VSlider,
      VCheckbox,
      VDialog,
      VSubheader,
      VSystemBar,
      VChip,
    },
    created() {
    },
    methods: {
      submit() {
        var establishment = this.$store.getters["@onei.ipc/getEstablishment"];

        var characteristicsSpecifications = this.$store.getters["@onei.ipc/getCharacteristicsSpecifications"];
        var planning1 = this.$store.getters["@onei.ipc/getPlanning1"];
        var planning2 = this.$store.getters["@onei.ipc/getPlanning2"];
        var unidadMedida = this.$store.getters["@onei.ipc/getUnidadMedida"];
        var cantidad = this.$store.getters["@onei.ipc/getCantidad"];

        this.$apollo.mutate({
          mutation: ESTABLISHMENT_MUTATION,
          variables: establishment,
        }).then((result) => {
          var establishment_id = result.data.addEstablishment.id
          this.$apollo.mutate({
            mutation: VARIETY_ESTABLISHMENT_MUTATION,
            variables: {
              establishmentId: establishment_id,
              stateId: 1,
              varietyCharactSpecificsId: characteristicsSpecifications,
              planningListId: [planning1, planning2 ],
              unidadMedidaId: unidadMedida,
              cantidadId: cantidad,

            }
          }).then((data) => {
            this.$store.dispatch('showMessage', {
              message: this.$i18n.t("applications.onei_ipc.modules.establecimiento.messages.add_success "),
              type: 'success'
            })
            this.$router.push(`/onei/sigip/ipc/variedad/${establishment_id}-${this.typologyId}-${this.marketId}`)
          }).catch((error) => {
            this.$store.dispatch('showMessage', {
              message: this.$i18n.t("applications.onei_ipc.modules.variedadEstablecimiento.messages.add_error "),
              type: 'error'
            })
            console.error(error)
          })
        }).catch((error) => {
          this.$store.dispatch('showMessage', {
            message: this.$i18n.t("applications.onei_ipc.modules.establecimiento.messages.add_error "),
            type: 'error'
          })
          console.error(error)
        })
      },

      getDescription(id: number, data: any){

         var mercadoDescripcion = data
          .filter((data)=> data.id === id)
          .map((data)=> data.description);
        return mercadoDescripcion;
      },
    },
    apollo: {
      markets:{
        query:QUERY_GET_MARKETS_CURRENCIES,
        update(data) {
          return data.marketsCurrencies
        }
      },
    },
    watch: {},
    computed: {

      next(): boolean {
        var establishment = this.$store.getters["@onei.ipc/getEstablishment"];
        this.descripcionMercado = establishment.marketId
        if (establishment.typologyId != "" && establishment.marketId != "") {
          this.typologyId = establishment.typologyId
          this.marketId = establishment.marketId
          this.visible = true
        }

        return (
          establishment.dpaId != "" &&
          establishment.marketId != "" &&
          establishment.typologyId != "" &&

          establishment.name != "" &&
          establishment.address != "" &&
          establishment.contact != "" &&
          establishment.phone != ""

        )
      },
      save(): boolean {
        var characteristicsSpecifications = this.$store.getters["@onei.ipc/getCharacteristicsSpecifications"];
        var totalCharactToValidate = this.$store.getters["@onei.ipc/getTotalCharactToValidate"].countCharact;
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
    data() {
      return {
        e1: 0,
        typologyId: null,
        marketId: null,
        visible: false,
        descripcionMercado: '',
        markets: []

      }
    },
    destroyed() {
      this.$store.commit("@onei.ipc/resetStore")
    }
  }
</script>
