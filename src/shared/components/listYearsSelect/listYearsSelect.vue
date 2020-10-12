<template>
<!--  <v-select-->
<!--    clearable-->
<!--    :items="items"-->
<!--    :label="label"-->
<!--    :item-value="val"-->
<!--    :item-text="text"-->
<!--    v-model="value"-->
<!--    attach-->
<!--    @change="$emit('change', getVal(value))"-->
<!--    @input="$emit('input', getVal(value))"-->
<!--    @click:clear="$emit('change', getVal())"-->
<!--  ></v-select>-->
  <v-select
    clearable
    :items="items"
    :label="label"
    @input="$emit('input', value)"
    @change="$emit('change',value)"
    v-model="value"

  ></v-select>
</template>

<script>
  import VSelect from "vuetify/es5/components/VSelect/VSelect";
  import {FILTER_YEARS_SELECT} from "../../graphql/queries";

  export default {
        name: "listYearsSelect",
      components: {
        VSelect
      },
      props: {
        value: {
          type: null
        },

        label: {
          type: String,
          require: true
        }
      },
      created() {

        this.itemSelected[this.val] = -1;
        this.fetchNomenclador();


      },
      data() {
        return {
          items: [],
          itemSelected: {},
          query: {
           query:FILTER_YEARS_SELECT

          },

        }
      },
      methods: {
        emitValue(method, val) {

          this.$emit(method, val);
        },
        fetchNomenclador() {

          this.$apollo.query(this.query).then((data) => {
            let tempData = [];
            //  tempData.push({...this.itemSelected});
            // tempData.push([...data.data[this.allResultVariables[type]]]);
            this.items = [...data.data.allYearsCatchment];
            this.itemSelected = this.value ? this.value[this.val] : -1;
          });
        },
        getVal(id = -1) {
          debugger;
          const val = id === -1 ?{ id: -1, description: "Seleccione" } : this.items.filter(e => e[this.val] === id)[0];

          return this.returnObject ? val : val[this.val];
        }

      }
    }
</script>

<style scoped>

</style>
