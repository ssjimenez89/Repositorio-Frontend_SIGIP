<template>
  <v-snackbar :color="type" :timeout="8000" v-model="show">
    {{message}}
    <v-btn @click.native="show = false" dark icon small>
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>
<script>
  import Vue from "vue";
  import VSnackbar from "@vuetify/components/VSnackbar";
  import VBtn from "@vuetify/components/VBtn";
  import VIcon from "@vuetify/components/VIcon";

  export default Vue.extend({
    name: "admin-snack-bar",
    components: {
      VSnackbar,
      VBtn,
      VIcon
    },

    created: function () {
      this.$store.watch(state => state.snackbar, () => {
        const msg = this.$store.getters.getMessage;
        if (msg !== '') {
          this.show = true;
          this.message = msg;
          this.type = this.$store.getters.getMessageType
        }
      })
    },
    data() {
      return {
        show: false,
        message: '',
        type: ''
      }
    }
  });
</script>
