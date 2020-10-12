<template>
  <v-card class="add_container">
    <v-layout row>
      <v-flex xs12>
        <v-card class="card--flex-toolbar">
          <v-toolbar card dark color="primary">
            <v-toolbar-title class="subheading">{{$t('applications.onei_ipc.modules.establecimiento.pages.view_establecimiento.form_title')}}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>npm run serve
            <v-form ref="formAddNomenclador" @submit.prevent="submit">
              <v-container grid-list-xl fluid>
                <v-layout wrap>
                  <v-flex xs12 md4 d-flex>
                    <v-select
                      v-model="dpaSelected"
                      :items="dpas"
                      :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.dpa')"
                      disabled
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 md4 d-flex>
                    <v-select
                      v-model="marketSelected"
                      :items="markets"
                      :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.market')"
                      disabled
                    ></v-select>
                  </v-flex>

                  <v-flex xs12 md4 d-flex>
                    <v-select
                      v-model="typologySelected"
                      :items="typologies"
                      :label="this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.typology')"
                      disabled
                    ></v-select>
                  </v-flex>

                  <v-flex xs12  md4>
                    <v-text-field
                      v-model="code"
                      color="purple darken-2"
                      :label= "this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.code')"
                      disabled
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12  md4>
                    <v-text-field
                      v-model="name"
                      color="purple darken-2"
                      :label= "this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.name')"
                      disabled=""
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12  md4>
                    <v-text-field
                      v-model="address"
                      color="purple darken-2"
                      :label= "this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.address')"
                      disabled=""
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12  md4>
                    <v-text-field
                      v-model="contact"
                      color="purple darken-2"
                      :label= "this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.contact')"
                      disabled=""
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12  md4>
                    <v-text-field
                      v-model="phone"
                      color="purple darken-2"
                      :label= "this.$i18n.t('applications.onei_ipc.modules.establecimiento.fields.phone')"
                      disabled=""
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 md12>
                   <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      to="/onei/sigip/ipc/establecimiento"
                    >
                      Cerrar
                    </v-btn>
                  </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
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
import {EDIT_ESTABLISHMENT_MUTATION,ESTABLISHMENT_BY_ID } from "../../components/establecimiento/graphql/graphql-nomenclador.js";
export default {
  name:"onei-establecimiento-edit",
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
    this.$apollo.queries.establishment.refetch()
  },
  apollo:{
    establishment:{
      query:ESTABLISHMENT_BY_ID,
        variables() {
          return {
            id: this.$route.params.id,
          }
        },
        update(data) {
          this.dpas=[`${data.establishmentById.dpa.code}-${data.establishmentById.dpa.description}`]
          this.dpaSelected=`${data.establishmentById.dpa.code}-${data.establishmentById.dpa.description}`
          this.markets=[`${data.establishmentById.market.market.description}-${data.establishmentById.market.currency.description}`]
          this.marketSelected=`${data.establishmentById.market.market.description}-${data.establishmentById.market.currency.description}`
          this.typologies=[data.establishmentById.typology.description]
          this.typologySelected=data.establishmentById.typology.description

          this.name=data.establishmentById.name
          this.address=data.establishmentById.address
          this.contact=data.establishmentById.contact
          this.phone=data.establishmentById.phone
          this.code=data.establishmentById.code
          this.active=data.establishmentById.active

          return data.establishmentById;
        }
    }
  },
  data(){
    return{
      establishment:'',
      dpas:[],
      typologies:[],
      markets: [],
      phone:0,
      contact:'',
      address:'',
      name:'',
      active:'',
      code:'',
      typologySelected:null,
      marketSelected:null,
      currencySelected:null,
      marketCurrencySelected:null,
      dpaSelected:null

    }
  }
  }
</script>
