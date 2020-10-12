<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="content">
    <!--<v-text-field-->
    <!--:label="label"-->
    <!--hint="For example, flowers or used cars"-->
    <!--:append-icon="icon"-->
    <!--persistent-hint-->
    <!--hide-details-->
    <!--return-object-->
    <!--single-line-->
    <!--:loading="loading"-->
    <!--v-model="currentText"-->
    <!--@blur="blur($event)"-->
    <!--@click="clickOrFocus()"-->
    <!--@focus="clickOrFocus()"-->
    <!--@keyup="esperarPorUsuario()"-->
    <!--&gt;</v-text-field>-->

    <v-autocomplete
      v-model="currentText"
      :append-icon="icon"
      clearable
      :error-messages="errorMessages"
      :messages="messages"
      :items="items"
      :label="label"
      :item-text="text"
      :item-value="identificador"
      persistent-hint
      :loading="loading"
      :attach="true"
      :search-input.sync="search"
      return-object
      @change="$emit('change', currentText)"
    >
      <template v-slot:append>

        <v-icon

        >
          {{icon}}

        </v-icon>

      </template>
      <template v-slot:no-data>
        <div>
          <no-found-result-auto-complete :texto="currentText"></no-found-result-auto-complete>

        </div>
      </template>
    </v-autocomplete>

    <!--<div v-if="loading">-->
    <!--<v-progress-linear-->
    <!--style="margin-top: 0"-->
    <!--color="success"-->
    <!--height="2"-->
    <!--indeterminate-->
    <!--&gt;</v-progress-linear>-->
    <!--&lt;!&ndash;<v-progress-circular&ndash;&gt;-->
    <!--&lt;!&ndash;:size="24"&ndash;&gt;-->
    <!--&lt;!&ndash;indeterminate&ndash;&gt;-->
    <!--&lt;!&ndash;color="primary"&ndash;&gt;-->
    <!--&lt;!&ndash;&gt;</v-progress-circular>&ndash;&gt;-->
    <!--</div>-->
    <div id="menu" class="v-menu__content theme--light menuable__content__active v-select-list v-card"
         v-if="showMenu"
    >
      <ul class="v-list">
        <li v-for="item in items" v-if="items.length > 0" @click="getValue(item[identificador])">
          <a class="v-list__tile v-list__tile--link v-list__tile--active theme--light primary--text"

          >
            <div class="v-list__tile__content">
              <div class="v-list__tile__title">{{render(item)}}</div>
            </div>
          </a>
        </li>
        <li v-if="items.length === 0">
          <a class="v-list__tile v-list__tile--link v-list__tile--active theme--light primary--text">
            <div class="v-list__tile__content">
              <div class="v-list__tile__title">No Data</div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  import VTextField from "@vuetify/components/VTextField";
  import VAutocomplete from "@vuetify/components/VAutocomplete";
  import VProgressLinear from "@vuetify/components/VProgressLinear";
  import VIcon from "@vuetify/components/VIcon";
  import {FILTER_ESTABLISHMENT_NO_REALTIONS} from "../../graphql/queries";
  import NoFoundResultAutoComplete from "@shared/components/no-found-result/no-found-result-autoComplete";

  export default {
    name: "autocomplete-generic-filed",
    components: {
      NoFoundResultAutoComplete,
      VTextField,
      VAutocomplete,
      VProgressLinear,
      VIcon
    },
    props: {
      errorMessages: {
        type: Array,
        required: false,
        default: () => []
      },
      messages: {
        type: Array,
        required: false,
        default: () => []
      },
      label: {
        type: String,
        required: true
      },
      query: {
        type: Object,
        required: true
      },
      identificador: {
        type: String,
        required: true,
        default: 'id'
      },
      filterBy: {
        type: String,
        required: true
      },
      text: {
        type: null,
        required: true
      },
      value: {
        type: null,
        required: false
      },
      dataName: {
        type: String,
        required: true
      }
    },
    created() {

    },
    data() {
      return {
        search: null,
        showMenu: false,
        items: [],
        selected: {},
        defaultVal: {},
        currentText: '',
        timeOut: '',
        clickOnMenu: false,
        icon: "search",
        loading: false
      }
    },
    watch: {
      search(val) {

        if (!val || val === this.currentText[this.text]) return;
        this.esperarPorUsuario(val);
      }
    },
    methods: {
      inputCheck(val) {
        debugger;
        // if (!val) {
        //   val = {};
        //   val[this.identificador] = -1;
        //   val[this.text] = '';
        // }
      },
      setDefault() {
        this.currentText[this.identificador] = -1;
        this.currentText[this.text] = "";
        //this.$emit('change',this.defaultVal);
        debugger;
      },
      clickOrFocus() {
        this.showMenu = true;
      },
      blur($event) {
        //this.showMenu = false;
        const scope = this;
        console.log(scope.clickOnMenu);
        setTimeout(function () {
          if (!scope.clickOnMenu) {
            scope.showMenu = false;
          }
        }, 100);
      },
      getValue(id) {

        this.showMenu = false;
        this.clickOnMenu = true;
        const val = this.items.filter(e => e[this.identificador] === id)[0];
        this.currentText = val.name;
        this.$emit('change', val);
        this.clickOnMenu = false
      },
      esperarPorUsuario(val = "") {
        // debugger;

        clearInterval(this.timeOut);
        const scope = this;
        this.timeOut = setTimeout(function () {
          // scope.icon = "mdi-sync mdi-spin";

          const a = val;
          scope.loading = true;
          scope.fetchData(val);
        }, 500);
      },
      fetchData(val = '') {

        // const query = {
        //
        //   query: FILTER_ESTABLISHMENT_NO_REALTIONS,
        //   variables: {
        //     marketId: -1,
        //     typologyId: -1,
        //     dpaId: -1,
        //     establishment: this.currentText !== '' ? this.currentText : "null",
        //     code: "",
        //     stateId: -1,
        //     page: 0,
        //     size: 5
        //   }
        //
        // };

        const tempQuery = {...this.query};
        tempQuery.variables[this.filterBy] = val !== '' ? val : '';

        this.$apollo.query(tempQuery).then((data) => {
          debugger;
          const a = this.dataName;
          this.items = [...data.data[this.dataName]];
          // this.icon = "search";
          this.loading = false;

        })
      },
      render(item) {
        if (typeof this.text === "function") {
          return this.text(item);
        }
        return item[this.text];
      }


    }
  }
</script>

<style scoped lang="stylus">
  #content
    width 100%
    position relative

    #menu
      min-width 290px

      ul
        list-style none

        li
          a:hover
            background rgba(0, 0, 0, 0.04)
      width 100%
      position absolute
      top 48px
      left 0
      z-index 2

</style>
