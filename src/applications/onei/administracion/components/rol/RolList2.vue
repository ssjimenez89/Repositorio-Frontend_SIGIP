<template>
  <v-card>
  <v-layout row>
<!--    <v-dialog  max-width="500" persistent v-model="dialog">-->
<!--      <v-card>-->
<!--        <v-card-title-->
<!--          class="headline primary justify-center"-->
<!--          primary-title-->
<!--        >-->
<!--          Eliminar-->
<!--        </v-card-title>-->
<!--        <v-card-text-->
<!--        class="justify-self-center"-->
<!--        >-->
<!--          Se eliminar&aacute; el rol <strong> {{selected.description}}. </strong> ¿Desea continuar?-->
<!--        </v-card-text>-->
<!--        <v-divider></v-divider>-->
<!--        <v-card-actions-->
<!--          class="justify-end"-->
<!--        >-->
<!--          <v-btn-->
<!--            @click.native="dialog = false"-->
<!--            color="blue darken-2"-->
<!--            flat-->
<!--          >-->
<!--            Cancelar-->
<!--          </v-btn>-->
<!--          <v-btn-->
<!--            dark-->
<!--            @click="deleteRol(selected)"-->
<!--            color="blue darken-2"-->

<!--          >-->
<!--            Eliminar-->
<!--          </v-btn>-->
<!--        </v-card-actions>-->
<!--      </v-card>-->
<!--    </v-dialog>-->
    <v-flex md4 lg4>
      <v-card>
        <div
          v-if="data.length === 0"
          key="title"
          class="title font-weight-light grey--text pa-3 text-xs-center"
        >
          Inserte un rol.
        </div>
        <v-list>
          <template
            style="display: inline"
            v-for="item in data"
          >
            <v-divider></v-divider>
            <v-list-tile
              :key="item.idRol"
              @click="current(item)"
              :class="back(item.description)"
            >
              <v-icon left small :class="color(item.activo)" >{{ item.activo ? "done": "clear" }}</v-icon>
              <!--<v-icon left small >label</v-icon>-->
              <v-list-tile-content>
                <v-list-tile-title v-html="item.description"></v-list-tile-title>
              </v-list-tile-content>
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
                  <v-list-tile :to="`/onei/sigip/administracion/rol/editar/${item.idRol}`">
                    <v-list-tile-action>
                      <v-icon>edit</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                      {{$t('applications.onei_administracion.modules.rol.pages.rol_list.action_list.edit')}}
                    </v-list-tile-title>
                  </v-list-tile>
<!--                  <v-list-tile-->
<!--                    @click="showDialog(item)">-->
<!--                    <v-list-tile-action>-->
<!--                      <v-icon>{{ item.activo ? "clear": "done" }}</v-icon>-->
<!--                    </v-list-tile-action>-->
<!--                    <v-list-tile-title>-->
<!--                      {{ item.activo-->
<!--                      ? $t('applications.onei_administracion.modules.rol.pages.rol_list.action_list.disable')-->
<!--                      : $t('applications.onei_administracion.modules.rol.pages.rol_list.action_list.enable')}}-->
<!--                    </v-list-tile-title>-->
<!--                  </v-list-tile>-->
                </v-list>
              </v-menu>
            </v-list-tile>
            <v-divider></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
    <v-divider vertical></v-divider>
    <v-flex md8 lg8 class="fondo">
      <v-card-text style="padding: 8px">
        <div
          v-if="currently.length === 0"
          key="title"
          class="title font-weight-light grey--text pa-3 text-xs-center"
        >
          Seleccione un rol del listado para visualizar sus permisos.
        </div>
          <v-scroll-x-transition
            group
            hide-on-leave
          >
          <v-chip
            v-for="(selection, i) in currently"
            outline
            color="primary"
            dark
            small
            :key="i"
            >
              <v-icon left small>assignment</v-icon>
              {{ selection.description }}
          </v-chip>
          </v-scroll-x-transition>
      </v-card-text>
    </v-flex>
  </v-layout>
  </v-card>
</template>
<script lang="ts">
import {VScrollXTransition,VScrollYTransition, VTransition} from "@vuetify/components/transitions";
import VBtn from "@vuetify/components/VBtn";
import {VCard, VCardActions, VCardText, VCardTitle} from "@vuetify/components/VCard";
import VChip from "@vuetify/components/VChip";
import VCombobox from "@vuetify/components/VCombobox";
import {VDataTable} from "@vuetify/components/VDataTable";
import VDialog from "@vuetify/components/VDialog";
import VDivider from "@vuetify/components/VDivider";
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
import {delete_rol, get_roles, get_usuarios} from "../../services/rol_services";


export default {
  name: "onei-rol-list2",
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
    VDivider,
    VScrollYTransition,
    VTransition,
    VScrollXTransition,
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

    deleteRol(rol) {

      // get_usuarios(rol.description).then(({data}) => {
      //   console.log(data, "");
      // });

      delete_rol(rol.idRol).then(e => {
        const mensaje = e.headers["x-sigipapp-info"];
        this.$store.dispatch('showMessage', {
          message: mensaje,
          type: 'success'
        });
        this.dialog = false;
        this.actualizarData();
      }).catch(error=> {
        const mensaje = error.response.headers["x-sigipapp-badrequest"];
        this.$store.dispatch('showMessage', {
          message: mensaje,
          type: 'error'
        });
      })
    },

    current(props: any) {
      this.selected = props;
      this.currently = props.permisos;
    },

    back(idRol) {
      return [(this.selected.description === idRol) ? 'marcado' : '']
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
    },

    actualizarData() {
      get_roles().then(({data}) => (this.data = data));
      this.currently = [];
    },

    color(activo) {
      return [activo ? 'verde' : 'rojo']
    }
  },

};
</script>
<style lang="stylus" scoped>
  .v-list {
    padding: 0px
  }

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

  .fondo
    background: #fafafa;

  .marcado
    background: #e5e5e5;

  .flex-grow
    flex-grow: 0;

  .rojo
    color: #f6242a;

  .verde
    color: #4deb68;

  .v-card__text
    font-size: 18px;

  .v-card__title
    color: white;


</style>
