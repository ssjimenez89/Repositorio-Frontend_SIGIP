<template>
        <v-card :to="link" class="mb-3 py-3 px-3" flat hover>
          <v-img :src="url" class="mb-2" contain height="12em" v-if="url !== ''"></v-img>
          <v-icon v-if="url === ''" :color="color" size="12em">{{icon}}</v-icon>
          <h3 class="mb-1">{{ this.name }}</h3>
          <p class="mb-0">{{ this.description }}</p>
        </v-card>
</template>

<script>
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VIcon from "@vuetify/components/VIcon";
  import VImg from "@vuetify/components/VImg";
  import {VCard, VCardMedia} from "@vuetify/components/VCard";
  import {VSpacer} from "@vuetify/components/VGrid";
  import {VToolbar, VToolbarTitle} from "@vuetify/components/VToolbar";

  export default {
    name: "avatar-item",
    components: {
      VCard,
      VCardMedia,
      VSpacer,
      VToolbar,
      VToolbarTitle,
      VContainer,
      VFlex,
      VLayout,
      VIcon,
      VImg
    },

    props: {
      icon: {
        type: String,
        default: 'edit'
      },
      color: {
        type: String,
        default: 'red'
      },
      url: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: '',
        required: true
      },
      description: {
        type: String,
        default: '',
        required: true
      },
      link: {
        type: String,
        required: true,
        default: '/'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .image_size {
    background-size: 20em !important;
  }
</style>
