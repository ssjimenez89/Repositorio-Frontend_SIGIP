<template>
<v-layout>
  <loading-dialog v-model="$apollo.queries.characteristicsSpecification.loading"
                  message="Cargando Especificaciones de la variedad">

  </loading-dialog>
  <v-flex xs12 md12 d-flex>
    <div>
      <v-card-title v-if="characteristics.length>0">
        {{$t('applications.onei_ipc.modules.variedad.list_variedad.action_list.specification')}}
        <v-container grid-list-xl fluid>
          <v-layout wrap>
            <characteristic v-for="object in characteristics" :key="keyId(object.characteristic.id)" :specifications="object.specification" :characteristic="object.characteristic" :varietyId="varietyId" :specificationSelected="object.specificationSelected" :disable="disable">

            </characteristic>

            <v-flex xs12 md3 d-flex>
              <v-select
                item-text="description"
                item-value="id"
                v-model="unidadMedidaSelected"
                :items="unidadMedidas"
                :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.unidadMedida')"
                :rules="[v => !!v || this.$i18n.t('applications.onei_ipc.messages.required')]"
                :disabled="this.disable"
              ></v-select>
            </v-flex>

            <v-flex xs12 md3 d-flex>
              <v-select
                item-text="description"
                item-value="id"
                v-model="cantidadSelected"
                :items="cantidades"
                :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.cantidad')"
                :rules="[v => !!v || this.$i18n.t('applications.onei_ipc.messages.required')]"
                :disabled="this.disable"
              ></v-select>
            </v-flex>

            <v-flex v-if="esMercadoAgropecuario == false" xs12 md3 d-flex>
              <v-select
                item-text="day"
                item-value="id"
                v-model="planningSelected1"
                :items="dates"
                :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.date')"
                :rules="[v => !!v || this.$i18n.t('applications.onei_ipc.messages.required')]"
                :disabled="this.disable"
              ></v-select>
            </v-flex>

            <v-flex v-if="esMercadoAgropecuario" xs12 md3 d-flex>
              <v-select
                item-text="day"
                item-value="id"
                v-model="planningSelected1"
                :items="datesAgr"
                :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.date')"
                :rules="[v => !!v || this.$i18n.t('applications.onei_ipc.messages.required')]"
                :disabled="this.disable"
              ></v-select>
            </v-flex>

            <v-flex v-if="esMercadoAgropecuario && semanaMercadoAgropecuario == 1" xs12 md3 d-flex>
              <v-select
                item-text="day"
                item-value="id"
                v-model="planningSelected2"
                :items="datesAgrWeek3"
                :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.date')"
                :rules="[v => !!v || this.$i18n.t('applications.onei_ipc.messages.required')]"
                :disabled="this.disable"
              ></v-select>
            </v-flex>

            <v-flex v-if="esMercadoAgropecuario && semanaMercadoAgropecuario == 2" xs12 md3 d-flex>
              <v-select
                item-text="day"
                item-value="id"
                v-model="planningSelected2"
                :items="datesAgrWeek4"
                :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.date')"
                :rules="[v => !!v || this.$i18n.t('applications.onei_ipc.messages.required')]"
                :disabled="this.disable"
              ></v-select>
            </v-flex>


          </v-layout>
        </v-container>
      </v-card-title>
      <v-card-title v-else>
        {{$t('applications.onei_ipc.modules.variedad.list_variedad.action_list.no_specification')}}
      </v-card-title>
    </div>
  </v-flex>
</v-layout>
</template>
<script lang="ts">
import VBtn from "@vuetify/components/VBtn";
import LoadingDialog from "@shared/components/loading-dialog/loading-dialog.vue";
import {VCard,VCardActions,VCardText,VCardTitle} from "@vuetify/components/VCard";
import VCheckbox from "@vuetify/components/VCheckbox";
import VChip from "@vuetify/components/VChip";
import VDialog from "@vuetify/components/VDialog";
import VDivider from "@vuetify/components/VDivider";
import VForm from "@vuetify/components/VForm";
import { VSpacer } from "@vuetify/components/VGrid";
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
import { VToolbar, VToolbarTitle } from "@vuetify/components/VToolbar";
import {VARIETY_CHARACT_SPECIFIC_ACTIVE_BY_ID_CLASSIFIER} from "../../components/variedad/graphql/graphql-variedad.js";
import Characteristic from "../../components/caracteristica/Caracteristica.vue";
import { create } from 'domain';
import {
  QUERY_GET_PLANNINGS,
  QUERY_GET_SPECIFICATION_ACTIVE_DE_UNIDAD_MEDIDA,
  QUERY_GET_SPECIFICATION_ACTIVE_DE_CANTIDAD,
  QUERY_GET_MARKETS_CURRENCIES, QUERY_GET_PLANNINGSXWEEK
} from "@/applications/onei/domain/ipc/components/establecimiento/graphql/graphql-nomenclador";
export default {
  name:"onei-establecimiento-caracteristica",
  components: {
    Characteristic,
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
    LoadingDialog,
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
  props: ['varietyId', 'marketId', 'varietyName','specificSelectedByCharact','disable', 'planningId', 'planningId2', 'unidadmedidaId', 'cantidadId'],
  computed: {

    esMercadoAgropecuario(){
      this.salvarStore();
      if(this.markets.length)
       return this.getDescription(this.marketId, this.markets) == 'Agropecuario-CUP';
    },

    semanaMercadoAgropecuario(){
      if(this.dates.length) {
        this.getSemana(this.planningSelected1, this.dates);
        if(this.semanaAnterior != this.semana){
          if( this.semanaAnterior != null){
          this.$store.commit("@onei.ipc/resetPlanning2");
          }
        }
      }
        return this.semana;
    }
  },
  methods: {

    getDescription(id: number, data: any){
      this.mercadoDescripcion = data
        .filter((data)=> data.id === id)
        .map((data)=> data.description);
      return this.mercadoDescripcion;
    },

    getSemana(id: number, data: any){
      this.semanaAnterior = this.semana;
      this.semana = data
        .filter((data)=> data.id === id)
        .map((data)=> data.week);
      return this.semana;
    },

    keyId(id){//key formado por el id de la variedad seleccionada mas el di de la caracteristica recuperada
      var key=this.varietyId+""+id
      return key
    },

    salvarStore(){
      this.$store.commit("@onei.ipc/setPlanning1", this.planningId);
      this.$store.commit("@onei.ipc/setPlanning2", this.planningId2);
      this.$store.commit("@onei.ipc/setUnidadMedida",this.unidadmedidaId);
      this.$store.commit("@onei.ipc/setCantidad",this.cantidadId)
    }


  },
  apollo:{
    characteristicsSpecification:{
      query: VARIETY_CHARACT_SPECIFIC_ACTIVE_BY_ID_CLASSIFIER,
      variables(){
        return{
          id:this.varietyId
        }
      },
      update(data){
        this.loading = false;
        //console.log("update")

        this.characteristics=[]
        var charact_specific=data.findByVarietyCharactSpecificActive
        //Aqui se construye la variable this.characteristics con el siguiente formato {"characteristic":objectCharacteristic,"specification":Array from specification by characteristic "specificationSelected": valor con la specification seleccionada si estas editando} para luego construir los selects de caracterisitca con sus especificaciones

        charact_specific.forEach(element => {
          let found=this.characteristics.find(value=> value.characteristic.description === element.specification.characteristic.description)
          if(found!=undefined){

            found.specification.push(element.specification)
          }else{

            var newCharacSpecif={}
            if(this.specificSelectedByCharact==undefined){// si es undefined estas creando variedad establecimiento, si es distinto de undefined estas modificando variedad establecimiento
              newCharacSpecif={"characteristic":element.specification.characteristic,"specification":[element.specification],"specificationSelected":undefined}
            }else{
              var item=this.specificSelectedByCharact.find(value=> value.specification.characteristic.description===element.specification.characteristic.description)
              var specificationSelected=item.specification
              newCharacSpecif={"characteristic":element.specification.characteristic,"specification":[element.specification],"specificationSelected":specificationSelected}
            }

            this.characteristics.push(newCharacSpecif)
          }
        });
        var countCharact=this.characteristics.length
        this.$store.commit("@onei.ipc/setTotalCharactToValidate",{countCharact});
        return data.classifierById
      },
      fetchPolicy: 'network-only'
    },
    dates:{
      query:QUERY_GET_PLANNINGS,
      update(data) {
        return data.plannings
      }
    },
    unidadMedidas:{
      query:QUERY_GET_SPECIFICATION_ACTIVE_DE_UNIDAD_MEDIDA,
      update(data) {
        return data.specificationListActiveDeUM
      }
    },

    cantidades:{
      query:QUERY_GET_SPECIFICATION_ACTIVE_DE_CANTIDAD,
      update(data) {
        return data.specificationListActiveDeCantidad
      }
    },

    markets:{
      query:QUERY_GET_MARKETS_CURRENCIES,
      update(data) {
        return data.marketsCurrencies
      }
    },

    datesAgr:{
      query:QUERY_GET_PLANNINGSXWEEK,
      variables: {
        week1: 1,
        week2: 2
      },
      update(data) {
        return data.planningsDayXWeek
      }
    },

    datesAgrWeek3:{
      query:QUERY_GET_PLANNINGSXWEEK,
      variables: {
        week3: 3
      },
      update(data) {
        return data.planningsDayXWeek
      }
    },

    datesAgrWeek4:{
      query:QUERY_GET_PLANNINGSXWEEK,
      variables: {
        week4: 4
      },
      update(data) {
        return data.planningsDayXWeek
      }
    }

  },
  watch:{
    varietyId(){
      this.$store.commit("@onei.ipc/resetCharacteristics")
    },

    planningSelected1(){
      this.$store.commit("@onei.ipc/setPlanning1", this.planningSelected1)
    },
    planningSelected2(){
      this.$store.commit("@onei.ipc/setPlanning2", this.planningSelected2)
    },

    unidadMedidaSelected(){
      this.$store.commit("@onei.ipc/setUnidadMedida",this.unidadMedidaSelected)
    },

    cantidadSelected(){
      this.$store.commit("@onei.ipc/setCantidad",this.cantidadSelected)
    },

  },

  data(){
    return{
      characteristicsSpecification:{},
      characteristics:[],
      planningSelected1:this.planningId,
      planningSelected2:this.planningId2,
      unidadMedidaSelected: this.unidadmedidaId,
      cantidadSelected: this.cantidadId,
      dates: [],
      datesAgr:[],
      datesAgrWeek3:[],
      datesAgrWeek4:[],
      unidadMedidas: [],
      cantidades: [],
      markets: [],
      semana:null,
      semanaAnterior: null,
      loading: true,
    }
  },
  destroyed(){
    this.$store.commit("@onei.ipc/resetCharacteristics")
  },
  created() {
  },

  }
</script>
