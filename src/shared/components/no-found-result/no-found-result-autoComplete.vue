<template>
  <div class="cont">
    <div class="texto">
      {{text}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "no-found-result-auto-complete",
    props: {
      texto: {
        required: false,
        type: String,
        default: ''
      }
    },
    data() {
      return {
        text: 'No hay elementos'
      }
    }
  }
</script>

<style scoped lang="stylus">
  .cont
    height 48px
    display flex
    align-items center

    .texto
      padding 0 16px 0 16px
</style>
