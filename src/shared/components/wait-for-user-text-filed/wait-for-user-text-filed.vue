<template>
  <v-text-field
    :label="label"
    append-icon="search"
    hide-details
    return-object
    single-line
    v-model="text"
    @input="$emit('input', text)"
    @keyup="waitForUser()"
  ></v-text-field>
</template>

<script>
  import VTextField from "@vuetify/components/VTextField";

  export default {
    name: "wait-for-user-text-filed",
    components: {
      VTextField
    },
    props: {
      label: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: false
      },
      placeholder: {
        type: String,
        required: false
      }
    },
    created() {
      this.text = this.value ? this.value : '';
    },
    data() {
      return {
        timeOut: null,
        text: ''
      }
    },
    methods: {
      waitForUser() {
        clearInterval(this.timeOut);
        const scope = this;
       scope.timeOut = setTimeout(function () {
          scope.$emit('change', scope.text);
        }, 500);
      }
    }
  }
</script>

<style scoped>

</style>
