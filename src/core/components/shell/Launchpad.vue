<template>
  <div>
    <v-dialog
      @keydown.esc="closeModal"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      v-model="dialog"
    >
      <v-btn icon slot="activator">
        <v-icon>apps</v-icon>
      </v-btn>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>{{ $t("administrator.shell.launchpad.modal.title") }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click.stop="closeModal()" dark icon>
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container
          :key="applications.category"
          fluid
          grid-list-sm
          text-xs-center
          v-for="(applications) in categorizedApplications"
        >
          <v-layout row wrap>
            <v-flex :key="application.id" md3 sm3 v-for="application in applications" xs12>
              <avatar-item
                :link="getApplicationLink(application)"
                :url="application.logo"
                :name="$t(application.shortName)"
                :description="$t(application.description)"
              ></avatar-item>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import AvatarItem from "@shared/components/avatar-item/avatar-item";
  import VBtn from "@vuetify/components/VBtn";
  import {VCard, VCardMedia} from "@vuetify/components/VCard";
  import VDialog from "@vuetify/components/VDialog";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VIcon from "@vuetify/components/VIcon";
  import VImg from "@vuetify/components/VImg";
  import VSubheader from "@vuetify/components/VSubheader";
  import {VToolbar, VToolbarTitle} from "@vuetify/components/VToolbar";
  import {IApplicationStore} from "../../application";

  export default Vue.extend({
    name: "admin-launchpad",
    components: {
      AvatarItem,
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
    computed: {
      categorizedApplications(): any {
        return this.$store.state.applications.reduce(
          (categories: any, application: IApplicationStore) => {
            if (application.category !== "categories.login") {
              categories[application.category] =
                categories[application.category] || [];
              categories[application.category].push(application);
            }
            return categories;
          },
          {}
        );
      }
    },
    methods: {
      closeModal(): void {
        this.dialog = false;
      },
      getApplicationLink(application: IApplicationStore): any {
        return `/onei/sigip/${application.router.urlPath}`;
      }
    }
  });
</script>
<style lang="stylus" scoped>
  .image_size {
    background-size: 20em !important;
  }
</style>
