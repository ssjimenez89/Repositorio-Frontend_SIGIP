<template>
  <v-dialog
    v-model="value"
    persistent
    width="300"
  >
    <v-card
      color="primary"
      dark
    >
      <v-card-text>
        {{message}}
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import VDialog from "@vuetify/components/VDialog";
  import {VCard, VCardText} from "@vuetify/components/VCard";
  import VProgressLinear from "@vuetify/components/VProgressLinear";

  export default {
    name: "confirm-dialog",
    components: {
      VDialog,
      VCard,
      VCardText,
      VProgressLinear
    },
    props: {
      value: {
        type: Boolean,
        required: true
      },
      message: {
        type: String,
        required: false,
        default: "Cargando"
      },
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>

</style>
