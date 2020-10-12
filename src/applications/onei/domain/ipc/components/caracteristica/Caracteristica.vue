<template>
    <v-flex xs12 md3 d-flex>
      <v-select
        item-text="description"
        item-value="id"
        v-model="specification"
        :items="specifications"
        :rules="[v => !!v ||  this.$i18n.t('applications.onei_ipc.messages.required')]"
        return-object
        :label="characteristic.description"
        :disabled="disable"
      ></v-select>
    </v-flex>
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
export default {
  name:"onei-establecimiento-variedad-relation",
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
  props: ['characteristic','specifications','varietyId','specificationSelected','disable'],
  methods: {

  },
  apollo:{

  },
  computed:{

  },
  created(){
    if(this.specificationSelected!=undefined){
      this.specification=this.specificationSelected
    }
  },
  watch: {
    specification(){
      let characteristicId=this.characteristic.id
      let specificationId=this.specification.id
      let varietyId=this.varietyId
      this.$store.commit("@onei.ipc/addCharacteristics",{varietyId,characteristicId,specificationId})
    }
  },
  destroyed(){
  },
  data(){
    return{
      specification:{},
      disable:false
    }
  }
  }
</script>

