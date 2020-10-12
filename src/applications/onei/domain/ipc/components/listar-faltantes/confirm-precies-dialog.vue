<template>
  <v-dialog v-model="value" persistent :width="600">
    <v-card>
      <v-container>
        <v-card-title class="pb-0">
          <span class="headline">Suma de control</span>
        </v-card-title>
        <v-card-text>
          <v-container class="pt-0" grid-list-md>
            <!--<v-layout>-->
              <!--<v-flex md6>-->
                <!--<template>-->

                 <!--<variedades-list :data="data"></variedades-list>-->
                <!--</template>-->
              <!--</v-flex>-->
              <!--<v-flex md6>-->
                <!--<div>-->

                <!--</div>-->
              <!--</v-flex>-->
            <!--</v-layout>-->
            <variedades-list :data="data"></variedades-list>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="save">
            Aceptar
          </v-btn>
          <v-btn color="error" @click="close">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import VTextField from "@vuetify/components/VTextField";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VDialog from "@vuetify/components/VDialog";
  import {VCard, VCardActions, VCardText, VCardTitle} from "@vuetify/components/VCard";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VBtn from "@vuetify/components/VBtn";
  import VariedadesList from "./listarVariedades/variedades-list";
  export default {
    name: "confirm-precies-dialog",
    props: {
      value: {
        type: Boolean,
        default: false,
        required: true
      },
      data:{
        type: Object,
        default: {},
        required: true
      }
    },
    components: {
      VariedadesList,
      VCard,
      VCardActions,
      VCardText,
      VCardTitle,
      VFlex,
      VLayout,
      VSpacer,
      VBtn,
      VDialog,
      VContainer,
      VTextField
    },
  methods: {
    change($event){

    },
    close() {
      this.$emit('input', false);

    },
    save() {
      this.$emit('save', this.variedad);
      console.log(this.data);
      this.$emit('input', false);

    }
  }
  }
</script>

<style scoped>

</style>
