<template>

  <div>
    asdasdasd
    <v-autocomplete
      :items="currentItems"
      chips
      clearable
      multiple
      label="prueba Filtros"

      @change="change()"

      dense
    >
      <template v-slot:selection="{item,selected}">
        <v-chip
          label
        >
          {{item.text}}
        </v-chip>
        <v-chip
          close
        >
          {{item.filter}}
        </v-chip>
      </template>
      <template v-slot:item="{item}">
        <div v-if="(item.filter && filterMode)">
          {{item.text}}-{{item}}-{{filterMode}}
        </div>
        <div v-if="(!item.filter && !filterMode)">
          {{item.text}}-{{item}}-{{filterMode}}
        </div>
      </template>

    </v-autocomplete>
  </div>
</template>

<script>
  import {IFilterModel} from "../../types";
  import VAutocomplete from "@vuetify/components/VAutocomplete";
  import VChip from "@vuetify/components/VChip";

  export default {
    name: "filter-pro",
    components: {
      VAutocomplete,
      VChip
    },
    props: {
      by: {
        type: Array,
        required: true
      }
    },
    created() {

      const allFilters = Object.keys(this.filterModelValues);
      allFilters.forEach(f => {
        if (!this.by.includes(f)) {
          delete this.filterModelValues[f];
        }
      });
      this.filters = [...this.by];
      const items=[{value: 'filtro1', text: 'filtro2',filter:true,selected:true},{value: 'filtro4', text: 'filtro3',filter:true}];
      this.currentItems = items;
    },
    data() {
      return {
        filterModelValues: new IFilterModel(),
        currentItems: [],
        filters: [],
        filtersInUse: [],
        filterMode: true
      }
    },
    watch: {
      filterMode(val) {
        debugger;
        const items = val ? [{value: 'filtro1', text: 'filtro2',filter:true},{value: 'filtro4', text: 'filtro3',filter:true}]: [{text: 'value1', value: 'value1',filter:false}, {text: 'value2', value: 'value2',filter:false}] ;

        this.currentItems = items;
      }
    },
    methods: {
      change() {

        this.filterMode = !this.filterMode;
      }
    }
  }
</script>

<style scoped>

</style>
