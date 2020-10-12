<template>
  <v-container fill-height fluid>
    <v-layout xs12 align-center justify-center>
      <div class="text-md-center">
        <div class="ant-empty">
          <div class="ant-empty-image">
            <img alt="empty" :src="url" />
          </div>
          <div class="ant-empty-description">
            <h3>{{ $t("administrator.data_loader.no_result") }}</h3>
            <p class="grey-text">{{filterCaption}}</p>
          </div>
        </div>
      </div>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import { VCard, VCardTitle } from "@vuetify/components/VCard";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VImg from "@vuetify/components/VImg";
  import logo from "@/assets/not-found-result.svg";

  export default {
    name: "no-found-result",
    components: {
      VCard,
      VCardTitle,
      VFlex,
      VContainer,
      VLayout,
      VImg
    },
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        url: logo
      };
    },
    computed: {
      filterCaption() {
        const lastSentence = this.$t(
          "administrator.data_loader.no_result_filter_empty"
        );
        // if (this.filters.length === 0) {
        //   return this.$t("administrator.data_loader.no_result_description");
        // } else if (this.filters.length === 1) {
        //   const singular = this.$t(
        //     "administrator.data_loader.no_result_filter_singular"
        //   );
        //   return `${singular}${this.filters[0]}${lastSentence}`;
        // } else {
        //   const plural = this.$t(
        //     "administrator.data_loader.no_result_filter_plural"
        //   );
        //   return `${plural}${this.filters.join(", ")}${lastSentence}`;
        // }
        return this.$t("administrator.data_loader.no_result_description");
      }
    }
  };
</script>
<style>
  .ant-empty {
    margin: -20px 0px;
    line-height: 26px;
    text-align: center;
  }

  .ant-empty-image {
    margin-bottom: -128px;
  }

  .ant-empty-image img {
    width: 60%;
  }

  .ant-empty-description {
    margin: 0;
  }
</style>
