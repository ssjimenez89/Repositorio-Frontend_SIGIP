<template>
  <v-card class="elevation-15">
    <v-dialog max-width="290" persistent v-model="dialog">
      <v-card>
        <v-card-title
          class="headline"
        >
          Desactivar
        </v-card-title>
        <v-card-text>
          Se desactivar&aacute; el permiso <strong> {{selected.permiso}}. </strong> ¿Desea continuar?
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click.native="dialog = false"
            color="blue darken-2"
            flat
          >
            No
          </v-btn>
          <v-btn
            color="blue darken-2"
            flat
          >
            Si
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-title>
      <h4 class="title">{{$t('applications.onei_administracion.modules.permiso.pages.permiso_list.list_title')}}</h4>
      <v-text-field
        :label="$t('applications.onei_administracion.modules.permiso.pages.permiso_list.list_search_label')"
        append-icon="search"
        class="spacer_text_field"
        hide-details
        single-line
        v-model="search"
      >
      </v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="data"
      :search="search"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td class="text-md-left justify-left">{{ props.item.description}}</td>
        <td class="text-md-left justify-left">{{ props.item.permiso}}</td>
        <td class="text-md-left justify-left"> <v-icon>{{ props.item.activo ? "done": "clear" }}</v-icon></td>
        <td class="text-md-center justify-center layout px-0">
          <v-menu bottom
                  origin="center center"
                  transition="scale-transition">
            <v-btn icon slot="activator">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile :to="`/onei/sigip/administracion/permiso/editar/${props.item.idpermiso}`">
                <v-list-tile-action>
                  <v-icon>edit</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                  {{$t('applications.onei_administracion.modules.permiso.pages.permiso_list.action_list.edit')}}
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile
                @click="showDialog(props.item)">
                <v-list-tile-action>
                  <v-icon>{{ props.item.activo ? "clear": "done" }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                  {{ props.item.activo
                  ? $t('applications.onei_administracion.modules.permiso.pages.permiso_list.action_list.disable')
                  : $t('applications.onei_administracion.modules.permiso.pages.permiso_list.action_list.enable')}}
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>
<script lang="ts">
  import VBtn from "@vuetify/components/VBtn";
  import {VCard, VCardActions, VCardText, VCardTitle} from "@vuetify/components/VCard";
  import {VDataTable} from "@vuetify/components/VDataTable";
  import VDialog from "@vuetify/components/VDialog";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VIcon from "@vuetify/components/VIcon";
  import {VList, VListTile, VListTileAction, VListTileContent, VListTileTitle} from "@vuetify/components/VList";
  import VMenu from "@vuetify/components/VMenu";
  import VTextField from "@vuetify/components/VTextField";
  import VTooltip from "@vuetify/components/VTooltip";
  import {IPermiso} from "../../interfaces/permiso/IPermiso";

  export default {
    name: "onei-permiso-list",
    components: {
      VCard,
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
      VSpacer
    },
    created() {
      this.initialize();
    },
    props: {
      data: {
        type: Array,
        required: true,
      },
    },
    data() {
      const defaultPermiso: IPermiso = {
        description: "",
        permiso: "",
        activo: true,
        idRol: 1
      };
      return {
        dialog: false,
        search: "",
        selected: Object.assign({}, defaultPermiso),
      }
    },
    methods: {
      showDialog(item: IPermiso) {
        this.dialog = true;
        this.selected = item;
      },
      initialize() {
        this.headers = [
          {
            sortable: true,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_administracion.modules.permiso.pages.permiso_list.header_list.descripcion"
              )
              .toString(),
            value: "Descripcion"
          },
          {
            sortable: true,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_administracion.modules.permiso.pages.permiso_list.header_list.permiso"
              )
              .toString(),
            value: "Permiso"
          },
          {
            sortable: true,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_administracion.modules.permiso.pages.permiso_list.header_list.activo"
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
