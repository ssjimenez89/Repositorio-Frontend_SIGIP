<template>
  <v-card class="elevation-15">
    <v-toolbar card dark color="primary">
      <v-toolbar-title class="subheading">
        <h4 class="title">{{$t('applications.onei_administracion.modules.rol.pages.rol_list.list_title')}}</h4>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-dialog max-width="290" persistent v-model="dialog">
      <v-card>
        <v-card-title
          class="headline"
        >
          Desactivar
        </v-card-title>
        <v-card-text>
          Se desactivar&aacute; el rol <strong> {{selected.description}}. </strong> ¿Desea continuar?
        </v-card-text>
        <v-card-actions
        >
          <v-btn
            @click.native="dialog = false"
            color="blue darken-2"
            flat
          >
            Cancelar
          </v-btn>
          <v-btn
            @click="deleteTodo(selected.idRol)"
            color="blue darken-2"
            flat
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-title>
      <v-text-field
        :label="$t('applications.onei_administracion.modules.rol.pages.rol_list.list_search_label')"
        append-icon="search"
        class="spacer_text_field"
        hide-details
        single-line
        v-model="search"
      >
      </v-text-field>
    </v-card-title>
    <v-toolbar flat color="white">
      <v-toolbar-title>Expandable Table</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark @click="expand = !expand">
        {{ expand ? 'Close' : 'Keep' }} other rows
      </v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="data"
      :expand="expand"
      :search="search"
      no-data-text="No hay datos."
      hide-actions
      item-key="idRol"
    >
      <template slot="items" slot-scope="props">
        <tr @click="current(props)">
          <td class="text-md-left justify-left">{{ props.item.description }}</td>
          <td class="text-md-left justify-left"> <v-icon>{{ props.item.activo ? "done": "clear" }}</v-icon></td>
          <td class="text-md-center justify-center layout px-0">
            <v-menu
              bottom
              origin="center center"
              transition="scale-transition"
            >
              <v-btn
                icon
                slot="activator"
              >
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile :to="`/onei/sigip/administracion/rol/editar/${props.item.idRol}`">
                  <v-list-tile-action>
                    <v-icon>edit</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>
                    {{$t('applications.onei_administracion.modules.rol.pages.rol_list.action_list.edit')}}
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile
                  @click="showDialog(props.item)">
                  <v-list-tile-action>
                    <v-icon>{{ props.item.activo ? "clear": "done" }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>
                    {{ props.item.activo
                    ? $t('applications.onei_administracion.modules.rol.pages.rol_list.action_list.disable')
                    : $t('applications.onei_administracion.modules.rol.pages.rol_list.action_list.enable')}}
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </template>
      <template
        slot="expand"
        slot-scope="props">
        <v-container class="grey lighten-3 justify-center">
          <v-layout wrap>
           <v-flex
             xs12 md4
             v-for="subItem in currently"
             :key="subItem.id"
           >
              {{subItem.description}}
            </v-flex>
          </v-layout>
        </v-container>
      </template>
    </v-data-table>
  </v-card>
</template>
<script lang="ts">
import VBtn from "@vuetify/components/VBtn";
import {VCard, VCardActions, VCardText, VCardTitle} from "@vuetify/components/VCard";
import VChip from "@vuetify/components/VChip";
import VCombobox from "@vuetify/components/VCombobox";
import {VDataTable} from "@vuetify/components/VDataTable";
import VDialog from "@vuetify/components/VDialog";
import {VSpacer} from "@vuetify/components/VGrid";
import VContainer from "@vuetify/components/VGrid/VContainer";
import VFlex from "@vuetify/components/VGrid/VFlex";
import VLayout from "@vuetify/components/VGrid/VLayout";
import VIcon from "@vuetify/components/VIcon";
import {VList, VListGroup, VListTile, VListTileAction, VListTileContent, VListTileTitle} from "@vuetify/components/VList";
import VMenu from "@vuetify/components/VMenu";
import VSelect from "@vuetify/components/VSelect";
import VSubheader from "@vuetify/components/VSubheader";
import VTextField from "@vuetify/components/VTextField";
import {VToolbar,VToolbarSideIcon, VToolbarTitle } from "@vuetify/components/VToolbar";
import VTooltip from "@vuetify/components/VTooltip";
import {IRol} from "../../interfaces/rol/IRol";
import {delete_rol} from "../../services/rol_services";


export default {
  name: "onei-rol-list",
  components: {
    VCard,
    VContainer,
    VFlex,
    VLayout,
    VCardTitle,
    VCardText,
    VCardActions,
    VTextField,
    VDataTable,
    VMenu,
    VBtn,
    VIcon,
    VTooltip,
    VList,
    VListTile,
    VListTileContent,
    VListTileTitle,
    VListTileAction,
    VDialog,
    VToolbar,
    VToolbarTitle,
    VListGroup,
    VToolbarSideIcon,
    VCombobox,
    VChip,
    VSubheader,
    VSelect,
    VFlex,
    VSpacer
  },
  created() {
    this.initialize();
  },
  props: {
    data: {
      type: Array,
      required: true,
    }
  },
  data() {
    const defaultPermiso: IRol = {
      description: "",
      activo: true,
      permisos: []
    };
    return {
      expand: false,
      dialog: false,
      search: "",
      selected: Object.assign({}, defaultPermiso),
      currently: [],
    }
  },
  methods: {
    showDialog(item: IRol) {
      this.dialog = true;
      this.selected = item;
    },
    deleteTodo(id) {
      delete_rol(id);
    },
    current(props: any) {
      props.expanded = !props.expanded;
      this.currently = props.item.permisos;
    },
    initialize() {
      this.headers = [
        {
          sortable: true,
          align: "left",
          text: this.$i18n
            .t(
              "applications.onei_administracion.modules.rol.pages.rol_list.header_list.descripcion"
            )
            .toString(),
          value: "Descripcion"
        },
        {
          sortable: true,
          align: "left",
          text: this.$i18n
            .t(
              "applications.onei_administracion.modules.rol.pages.rol_list.header_list.activo"
            )
            .toString(),
          value: "Activo"
        },
      ];
    }
  }

};
</script>
<style lang="stylus" scoped>
  .list__tile
    font-size: 13px;

  .list__tile__action
    min-width: 30px;

  .icon
    font-size: 21px;

  .list__tile__title
    font-size: 13px;

  .spacer_text_field
    margin-left: 50%;




</style>
