<template>
    <div>


      <variedades-list :data="value"></variedades-list>
    </div>
</template>

<script>
  import VBtn from "@vuetify/components/VBtn";
  import VTextField from "@vuetify/components/VTextField";
  import VariedadesList from "../listarVariedades/variedades-list";
    export default {
        name: "step-complete",
      components:{
        VariedadesList,
        VBtn,
        VTextField
      },
      props:{
          value:{
            type: Object,
            required:true,
            default:{}
          }
      },
      data(){
          return {
            precioActual : 0,
            canGo: false
          }
      },
      methods:{
          validatePrecio(){
            console.log('asdasdasdasdasdasdasd');
            let cant = 0;
            Object.values(this.value).forEach(e => {
              cant += parseFloat(e.precio);
            });
            this.canGo = cant === this.precioActual;
            console.log(cant, 'dasdasdasdasd');
          }
      }
    }
</script>

<style scoped lang="stylus">

</style>
