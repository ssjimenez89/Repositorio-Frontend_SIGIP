<template>
  <v-dialog
    v-model="value"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">{{headerText}}</v-card-title>

      <v-card-text>
        <slot>
          {{bodyText}}
        </slot> 
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn v-if="!onlyAceptButton"
          color="green darken-1"
          flat="flat"
          @click="close('onCancel')"
        >
          {{ $t('applications.onei_ipc.messages.cancel') }}
        </v-btn>

        <v-btn
          color="green darken-1"
          flat="flat"
          @click="close('onAcept')"
        >
          {{ $t('applications.onei_ipc.messages.acept') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import VBtn from "@vuetify/components/VBtn";
  import{
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
  import {VToolbar, VToolbarTitle} from "@vuetify/components/VToolbar";
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

  export default {
    name: "confirm-dialog",
    components: {
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
      VToolbarTitle
    },
    props:{
      value:{
        type: Boolean,
        required: true,
        default: false
      },
      headerText:{
        type: String,
        required: false,
        default: "Confirmación"
      },
      bodyText:{
        type: String,
        required: true,
        default: ""
      },
      onlyAceptButton:{
        type: Boolean,
        required: false,
        default: false
      }
    },
    data() {
      return {
        dialog: false
      }
    },
    methods: {
      close(method) {
        this.value = false;
        this.$emit('input', false);
        this.$emit(method,this.context);
      }
    }
  }
</script>

<style scoped>

</style>
