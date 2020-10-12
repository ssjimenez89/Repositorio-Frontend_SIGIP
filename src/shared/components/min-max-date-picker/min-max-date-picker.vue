<template>
    <div>
      <date-picker-menu
        label="Min"
        v-model="from"
        min="2020-01-25"
        :max="toC"
      ></date-picker-menu>
      <date-picker-menu
        label="max"
        v-model="to"
        :min="fromC"


      ></date-picker-menu>
    </div>
</template>

<script>
    import DatePickerMenu from "../date-picker-menu/date-picker-menu";
    export default {
        name: "min-max-date-picker",
      components: {DatePickerMenu},

      data(){
          return{
            from:'',
            to:''
          }
      },
      computed:{
        fromC() {
          if (!this.from) return "";

          const [day, month, year] = this.from.split('-');
          return `${year}-${month}-${day}`;


        },
        toC() {
          if (!this.to) return "";

          const [day, month, year] = this.to.split('-');
          return `${year}-${month}-${day}`;


        }
      }
    }
</script>

<style scoped>

</style>
