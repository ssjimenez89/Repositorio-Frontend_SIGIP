<template>
  <div>
    {{user}}
  </div>
</template>

<script>
  import {obtener_usuario} from "../../../../administracion/services/usuario_services";

  export default {
    name: "get-user-component",
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        user: 'loading'
      }
    },
    created() {
      obtener_usuario(this.id).then(({data}) => {
        debugger;
        this.user = data.username;
      });
    }
  }
</script>

<style scoped>

</style>
