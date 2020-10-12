<template>
  <div>
    <v-dialog
      @keydown.esc="closeModal"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      v-model="dialog"
    >
      <div slot="activator">
        <slot name="activate">
          <v-btn icon>
            <v-icon>apps</v-icon>
          </v-btn>
        </slot>
      </div>
      <v-card>
        <v-toolbar card color="primary" dark>
          <v-toolbar-title>{{ $t("administrator.shell.launchpad.modal.title") }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <slot name="options"></slot>
          </v-toolbar-items>
          <v-btn @click.stop="closeModal()" dark icon>
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
            <slot name="content"></slot>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import VBtn from "@vuetify/components/VBtn";
import { VCard, VCardMedia } from "@vuetify/components/VCard";
import VDialog from "@vuetify/components/VDialog";
import { VSpacer } from "@vuetify/components/VGrid";
import VContainer from "@vuetify/components/VGrid/VContainer";
import VFlex from "@vuetify/components/VGrid/VFlex";
import VLayout from "@vuetify/components/VGrid/VLayout";
import VIcon from "@vuetify/components/VIcon";
import VImg from "@vuetify/components/VImg";
import VSubheader from "@vuetify/components/VSubheader";
import { VToolbar, VToolbarTitle } from "@vuetify/components/VToolbar";

export default {
  name: "launchpad",
  components: {
    VBtn,
    VCard,
    VCardMedia,
    VContainer,
    VDialog,
    VFlex,
    VIcon,
    VLayout,
    VSpacer,
    VSubheader,
    VToolbar,
    VToolbarTitle,
    VImg
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    closeModal() {
      this.dialog = false;
    },
  }
};
</script>
<style lang="stylus" scoped>
.image_size {
  background-size: 20em !important;
}
</style>
