<template>
  <v-btn @click="toggleFullscreen" icon v-if="fullscreenSupported">
    <v-icon>{{icon}}</v-icon>
  </v-btn>
</template>

<script lang="ts">
  import Vue from "vue";
  import VBtn from "@vuetify/components/VBtn";
  import VIcon from "@vuetify/components/VIcon";
  import fscreen from "fscreen";

  export default Vue.extend({
    name: "admin-fullscreen-button",
    components: {
      VBtn,
      VIcon,
    },
    data() {
      return {
        isFullscreen: false,
      };
    },
    computed: {
      icon() {
        return this.isFullscreen ? "fullscreen_exit" : "fullscreen";
      },
      fullscreenSupported(): any {
        return fscreen.fullscreenEnabled;
      },
    },
    methods: {
      setFullscreen(): void {
        this.isFullscreen = this.fullscreenSupported && fscreen.fullscreenElement !== null;
      },
      toggleFullscreen(): any {
        return this.isFullscreen
          ? fscreen.exitFullscreen()
          : fscreen.requestFullscreen(document.documentElement);
      },
    },
    created() {
      fscreen.addEventListener("fullscreenchange", this.setFullscreen);
    },
    beforeDestroy() {
      fscreen.removeEventListener("fullscreenchange", this.setFullscreen);
    },
  });
</script>
