<template>
  <v-menu
    :close-on-content-click="false" :nudge-width="200" offset-x v-model="menu"
  >
    <v-btn icon slot="activator">
      <v-badge color="red" overlap right v-model="showBadge">
        <span slot="badge">{{unread}}</span>
        <v-icon>notifications</v-icon>
      </v-badge>
    </v-btn>
    <v-card>
      <v-toolbar color="transparent" flat ligth>
        <v-btn icon>
          <v-icon>settings</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="closeModal" icon>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <div class="my-5 mx-2">
        <p class="mb-0 text-xs-center">{{ $t("administrator.shell.notification.modal.no_notifications") }}</p>
      </div>

      <v-card-actions>
        <v-btn @click="goToNotificationsPage" block color="primary" flat>
          {{ $t("administrator.shell.notification.modal.see_all") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
  import Vue from "vue"
  import VBadge from "@vuetify/components/VBadge";
  import VBtn from "@vuetify/components/VBtn";
  import {VCard, VCardActions} from "@vuetify/components/VCard";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VIcon from "@vuetify/components/VIcon";
  import VMenu from "@vuetify/components/VMenu";
  import {VToolbar} from "@vuetify/components/VToolbar";

  export default Vue.extend({
    name: "admin-notifications-button",
    components: {
      VBadge,
      VBtn,
      VCard,
      VCardActions,
      VIcon,
      VMenu,
      VSpacer,
      VToolbar,
    },
    data() {
      return {
        unread: 99,
        menu: false,
      };
    },
    computed: {
      showBadge(): Boolean {
        return this.unread > 0;
      },
    },
    methods: {
      goToNotificationsPage(): void {
        this.closeModal();
        // TODO navigate to notifications page
      },
      closeModal(): void {
        this.menu = false;
      },
    },
  });
</script>
