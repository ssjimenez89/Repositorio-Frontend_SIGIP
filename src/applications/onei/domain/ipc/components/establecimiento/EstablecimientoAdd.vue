<template>
  <div class="add_container">
    <v-layout row>
      <v-flex xs12>
        <v-card-text>
            <v-form ref="formAddNomenclador" @submit.prevent="submit">
              <v-container grid-list-xl fluid>
                <v-layout wrap>
                  <v-flex xs12 md4 d-flex>
                    <v-select
                      v-model="dpaSelected"
                      item-text="description"
                      item-value="id"
                      :items="dpas"
                      :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.dpa')"
                      :rules="[v => !!v ||  this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.dpa')]"
                    ></v-select>
                  </v-flex>

                  <v-flex  xs12 md4 d-flex>
                    <v-select
                      item-text="description"
                      item-value="id"
                      v-model="marketSelected"
                      :items="markets"
                      :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.market')"
                      :rules="[v => !!v || this.$i18n.t('applications.onei_ipc.messages.required')]"
                    ></v-select>
                  </v-flex>

                  <v-flex xs12 md4 d-flex>
                    <v-select
                      item-text="description"
                      item-value="id"
                      v-model="typologySelected"
                      :items="typologies"
                      :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.typology')"
                      :rules="[v => !!v || this.$i18n.t('applications.onei_ipc.messages.required')]"
                    ></v-select>
                  </v-flex>

                  <v-flex xs12  md4>
                    <v-text-field
                      v-model="name"
                      :label= "this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.name')"
                      required
                      :rules="rules.name"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12  md5>
                    <v-text-field
                      v-model="address"
                      :label= "this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.address')"
                      required
                      :rules="rules.name"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12  md4>
                    <v-text-field
                      v-model="contact"
                      :label= "this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.contact')"
                      required
                      :rules="rules.name"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12  md5>
                    <v-text-field
                      v-model="phone"
                      :label= "this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.phone')"
                      required
                      :rules="rules.name"
                    ></v-text-field>
                  </v-flex>

                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
      </v-flex>
    </v-layout>
  </div>
</template>
<script lang="ts">
import VBtn from "@vuetify/components/VBtn";
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
import {ESTABLISHMENT_MUTATION, QUERY_GET_DPA, QUERY_GET_DPA_RESOURCE, QUERY_GET_ESTABLISHMENT_PAGING,QUERY_GET_MARKETS,QUERY_GET_MARKETS_CURRENCIES,QUERY_GET_TYPOLOGIES, QUERY_GET_PLANNINGS, QUERY_GET_PLANNINGSXWEEK } from "../../components/establecimiento/graphql/graphql-nomenclador.js";
export default {
  name:"onei-establecimiento-add",
  components: {
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
    this.$apollo.queries.typologies.refetch()
    this.$apollo.queries.markets.refetch()
    this.$apollo.queries.dpas.refetch()

    var establishment=this.$store.getters["@onei.ipc/getEstablishment"];
    this.name=establishment.name
    this.address=establishment.address
    this.contact=establishment.contact
    this.phone=establishment.phone
    this.marketSelected=establishment.marketId
    this.typologySelected=establishment.typologyId
    this.dpaSelected=establishment.dpaId


  },
  mounted(){
  },
  computed:{
  },
  methods: {

  },
  apollo:{
     markets:{
      query:QUERY_GET_MARKETS_CURRENCIES,
        update(data) {
          return data.marketsCurrencies
        }
    },
    dpas:{
      query:QUERY_GET_DPA_RESOURCE,
        update(data) {
          return data.findAllDPAResource
        }
    },

    typologies:{
      query:QUERY_GET_TYPOLOGIES,
        update(data) {
          return data.typologies
        }
    },

  },
  watch: {
    name(){
      this.$store.commit("@onei.ipc/setName",this.name)
    },
    address(){
      this.$store.commit("@onei.ipc/setAddress",this.address)
    },
    phone(){
      this.$store.commit("@onei.ipc/setPhone",this.phone)
    },
    contact(){
      this.$store.commit("@onei.ipc/setContact",this.contact)
    },
    marketSelected(){
      this.$store.commit("@onei.ipc/setMarketId",this.marketSelected)
    },
    typologySelected(){
      this.$store.commit("@onei.ipc/setTypologyId",this.typologySelected)
    },
    dpaSelected(){
      this.$store.commit("@onei.ipc/setDpaId",this.dpaSelected)
    },

  },
  data(){
    return{
      dpas:[],
      typologies:[],
      markets: [],
      week: [],
      indice:'',// Indice por defecto IPC, esto despues hay q revizarlo
      phone:'',
      contact:'',
      address:'',
      name:'',
      typologySelected:null,
      marketSelected:null,
      marketDescriptionSelected:null,
      dpaSelected:null,
      dpaCode:'',

      rules: {
        name: [val => (val || "").length > 0 || this.$i18n
            .t(
              "applications.onei_ipc.messages.required"
            )],
      }
    }
  }
  }
</script>
