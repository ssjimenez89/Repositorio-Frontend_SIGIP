<template>
  <v-content class="mx-3 mt-3">
    <v-container fluid>
      <v-card class="elevation-15 mx-5" flat>
        <v-card-title class="primary white--text subheading ">
          <slot name="title">{{title}}</slot>
        </v-card-title>
        <v-card-text class="pa-0">
          <slot></slot>
          <v-tooltip left v-if="showAddButton">
            <v-btn
              bottom
              :color="opts.color"
              dark
              fab
              fixed
              right
              slot="activator"
              :to="opts.to"
            >
              <v-icon>add</v-icon>
            </v-btn>
            <span>{{opts.tooltip}}</span>
          </v-tooltip>
        </v-card-text>
        <v-card-actions v-if="cancelOpts.to !== null">
          <v-spacer></v-spacer>
          <slot name="botones"></slot>
          <v-btn :to="cancelOpts.to" color="error">
            Cancelar
          </v-btn>

        </v-card-actions>

      </v-card>
    </v-container>
  </v-content>
</template>

<script>
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VBtn from "@vuetify/components/VBtn/VBtn";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VCard from "@vuetify/components/VCard/VCard";
  import {VCardActions, VCardText} from "@vuetify/components/VCard";
  import VCardTitle from "@vuetify/components/VCard/VCardTitle";
  import VIcon from "@vuetify/components/VIcon";
  import VTooltip from "@vuetify/components/VTooltip";

  export default {
    name: "main-content",
    components: {
      VCard,
      VCardActions,
      VCardText,
      VCardTitle,
      VContainer,
      VContent,
      VBtn,
      VFlex,
      VSpacer,
      VLayout,
      VIcon,
      VTooltip
    },
    data() {
      return {
        opts: {tooltip: 'Registrar', to: '/', color: 'green'},
        showAddButton: false,
        showActionButtons: false,
        showCancelButton: false

      }
    },
    props: {
      title: {
        type: String,
        required: false,
        default: 'Nombre del componente'
      },
      addOpts: {
        type: Object,
        required: false

      },
      cancelOpts: {
        type: Object,
        required: false,
        default: () => {
          return {to: null}
        }

      },
    },
    created() {
      if (this.addOpts) {
        this.showAddButton = true;
        Object.keys(this.addOpts).forEach(e => {
          this.opts[e] = this.addOpts[e];
        });
      }

    }
  }
</script>

<style scoped>

</style>
