<template>
  <v-card class="elevation-15">
    <!--    <v-card-title>-->
    <!--      <h4 class="title">{{$t('applications.onei_administracion.modules.usuario.pages.usuario_list.list_title')}}</h4>-->
    <!--    </v-card-title>-->
    <v-container grid-list-xl fluid>
      <v-layout wrap>
        <v-flex md4>
          <v-text-field
            append-icon="search"
            label="Nombre"
            single-line
            return-object
            hide-details
            v-model="defaultUsuario.primernombre"
          ></v-text-field>
        </v-flex>
        <v-flex md4>
          <v-text-field
            append-icon="search"
            label="Primer apellido"
            single-line
            return-object
            hide-details
            v-model="defaultUsuario.primerapellido"
          ></v-text-field>
        </v-flex>
        <v-flex md4>
          <v-text-field
            append-icon="search"
            label="Segundo apellido"
            single-line
            return-object
            hide-details
            v-model="defaultUsuario.segundoapellido"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout wrap>
        <v-flex md4>
          <v-autocomplete
            v-model="defaultUsuario.cargo"
            :items="lista_cargo"
            item-value="identificador"
            item-text="descripcion"
            attach
            dense
            label="Cargo"
            no-data-text="No hay datos"
            clearable
          ></v-autocomplete>
        </v-flex>
        <v-flex md4>
          <v-autocomplete
            v-model="defaultUsuario.dpa"
            :items="lista_dpa"
            item-value="identificador"
            item-text="descripcion"
            attach
            dense
            label="Dpa"
            no-data-text="No hay datos"
            clearable
          ></v-autocomplete>
        </v-flex>
        <!--        <v-flex md4>-->
        <!--          <v-autocomplete-->
        <!--            v-model="defaultUsuario.rolbusqueda"-->
        <!--            :items="lista_roles"-->
        <!--            item-value="idRol"-->
        <!--            item-text="description"-->
        <!--            attach-->
        <!--            dense-->
        <!--            label="Roles"-->
        <!--            no-data-text="No hay datos"-->
        <!--            clearable-->
        <!--          ></v-autocomplete>-->
        <!--        </v-flex>-->
        <!--        <v-flex md4>-->
        <!--          <v-checkbox-->
        <!--            v-model="defaultUsuario.activo_busqueda"-->
        <!--            label="Activo"-->
        <!--            dense-->
        <!--            chips-->
        <!--          ></v-checkbox>-->
        <!--        </v-flex>-->
        <v-flex md4>
          <v-select
            v-model="defaultUsuario.activo_busqueda"
            item-value="id"
            item-text="valor"
            :items="activosarray"
            clearable
            label="Activo"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout wrap>
        <v-flex md3>
          <v-btn
            @click="buscar()"
            color="primary"
            type="submit"
            append-icon="search"
          >
            <v-icon>search</v-icon>
            Buscar
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <!--    :loading="loading"-->
    <v-container class="ma-0 pa-0">
      <v-data-table
        :headers="headers"
        :items="usuarios"
        :pagination.sync="pagination"
        :total-items="totalDataTable"
        class="elevation-1"
        :rows-per-page-text="this.$i18n.t('applications.onei_ipc.components.table.dataTable.rowsPerPageText')"
        :rows-per-page-items="pageItems"
      >
        <template slot="items" slot-scope="props">
          <td class="text-md-left justify-left">{{ props.item.cod_dpa }}</td>
          <td class="text-md-left justify-left">{{ props.item.primernombre}} {{ props.item.segundonombre}}</td>
          <td class="text-md-left justify-left">{{ props.item.primerapellido }}</td>
          <td class="text-md-left justify-left">{{ props.item.segundoapellido }}</td>
          <td class="text-md-left justify-left">{{ props.item.username }}</td>
          <td class="text-md-left justify-left">{{ props.item.denom_cargo }}</td>
          <td class="text-md-left justify-left">{{ props.item.activo ?"Si":"No"}}</td>
          <td class="text-md-center justify-center layout px-0">
            <v-menu bottom
                    origin="center center"
                    transition="scale-transition"
                    :close-on-content-click="true">
              <v-btn icon slot="activator">
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile :to="`/onei/sigip/administracion/usuario/edit-usuario/${props.item.idTrabajador}`">
                  <v-list-tile-action>
                    <v-icon>edit</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>
                    {{$t('applications.onei_administracion.modules.usuario.pages.usuario_list.action_list.edit')}}
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile :to="`/onei/sigip/administracion/usuario/visualizar/${props.item.idTrabajador}`">
                  <v-list-tile-action>
                    <v-icon>remove_red_eye</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>
                    {{$t('applications.onei_administracion.modules.usuario.pages.usuario_list.action_list.visualizar')}}
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile :to="`/onei/sigip/administracion/usuario/cambiarpassword/${props.item.idTrabajador}`">
                  <v-list-tile-action>
                    <v-icon>vpn_key</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>
                    {{$t('applications.onei_administracion.modules.usuario.pages.usuario_list.action_list.cambiar_password')}}
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="cambiar(props.item)">
                  <v-list-tile-action>
                    <v-switch v-model="props.item.activo" color="primary"></v-switch>
                  </v-list-tile-action>
                  <v-list-tile-title>
                    {{ (!props.item.activo)
                    ?$t('applications.onei_administracion.modules.usuario.pages.usuario_list.action_list.activar')
                    :$t('applications.onei_administracion.modules.usuario.pages.usuario_list.action_list.desactivar')
                    }}
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </td>
        </template>
        <!--      <template slot="no-data">-->
        <!--        <v-alert :value="true" color="error" icon="warning">-->
        <!--          {{$t('applications.onei_ipc.components.table.no_data')}}-->
        <!--        </v-alert>-->
        <!--      </template>-->

        <template slot="no-data">
          <not-found-result></not-found-result>
        </template>
      </v-data-table>
    </v-container>

  </v-card>

</template>
<script lang="ts">
  import NotFoundResult from "@onei/core/pages/NotFoundResult.vue";
  import MainContent from "@shared/components/main-content/main-content";
  import VAlert from "@vuetify/components/VAlert";
  import VAutocomplete from "@vuetify/components/VAutocomplete";
  import VBtn from "@vuetify/components/VBtn";
  import {VCard, VCardActions, VCardText, VCardTitle} from "@vuetify/components/VCard";
  import VCheckbox from "@vuetify/components/VCheckbox";
  import {VDataTable} from "@vuetify/components/VDataTable";
  import VDialog from "@vuetify/components/VDialog";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VIcon from "@vuetify/components/VIcon";
  import {VList, VListTile, VListTileAction, VListTileContent, VListTileTitle} from "@vuetify/components/VList";
  import VMenu from "@vuetify/components/VMenu";
  import VSelect from "@vuetify/components/VSelect";
  import VSwitch from "@vuetify/components/VSwitch";
  import VTextField from "@vuetify/components/VTextField";
  import VToolbar from "@vuetify/components/VToolbar";
  import VTooltip from "@vuetify/components/VTooltip";
  import {IUsuario} from "../../interfaces/usuario/IUsuario";
  import {activar_desactivar_usuario, get_users_page} from "../../services/usuario_services";

  export default {
    name: "onei-usuario-list",
    components: {
      NotFoundResult,
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
      VSpacer,
      VSwitch,
      MainContent,
      VAutocomplete,
      VToolbar,
      VLayout,
      VContainer,
      VContent,
      VFlex,
      VAlert,
      VCheckbox,
      VSelect
    },
    created() {
      this.initialize();
    },
    props: {
      // data: {
      //   type: Array,
      //   required: true,
      // },
      lista_roles: {
        type: Array,
        required: true
      },
      lista_dpa: {
        type: Array,
        required: true
      },
      lista_cargo: {
        type: Array,
        required: true
      }
    },
    data() {
      const defaultUsuario: IUsuario = {
        idTrabajador: -1,
        primernombre: "",
        primerapellido: "",
        segundoapellido: "",
        username: "",
        activo: false,
        cargo: -1,
        dpa: -1,
        activo_busqueda: -1,
      };
      return {
        defaultUsuario,
        pageItems: [5, 10, 25],
        totalDataTable: 0,
        dataTable: [],
        loading: true,
        pagination: {},
        headers: [],
        search: false,
        dialog: false,
        idCurrent: '',
        states: [],
        totalDataFilter: 0,
        address: '',
        code: '',
        activosarray: [{id: 1, valor: "Si"}, {id: 0, valor: "No"}],
        usuarios: []

      }
    },
    watch: {
      pagination(event) {
        // debugger;
        get_users_page(event, this.defaultUsuario).then(data => {
          this.setData(data);
        });
      }
    },
    methods: {
      setData(data) {
        if (data.data._embedded) {
          this.usuarios = [...data.data._embedded.usuarioResourceList];
          this.totalDataTable = data.data.page.totalElements;
        } else {
          this.usuarios = [];
          this.totalDataTable = 0;
        }
      },
      buscar(item: IUsuario) {
        get_users_page({page: 1, rowsPerPage: this.pagination.rowsPerPage}, this.defaultUsuario).then(data => {
          this.setData(data);
        });

      },
      cambiar(item: IUsuario) {
        this.defaultUsuario.activo = item.activo;
        activar_desactivar_usuario(item.idTrabajador, this.defaultUsuario).then(e => {
          const mensaje = e.headers["x-sigipapp-info"];
          this.$store.dispatch('showMessage', {
            message: mensaje,
            type: 'success'
          });
          this.$router.push('/onei/sigip/administracion/usuarios');
        }).catch(error => {
          const mensaje = error.response.headers["x-sigipapp-badrequest"];
          this.$store.dispatch('showMessage', {
            message: mensaje,
            type: 'error'
          });
        })
      },
      initialize() {
        this.headers = [
          {
            align: "left",
            sortable: false,
            text: this.$i18n
              .t(
                "applications.onei_administracion.modules.usuario.pages.usuario_list.header_list.dpa"
              ),
            value: "Dpa"
          },
          {
            sortable: false,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_administracion.modules.usuario.pages.usuario_list.header_list.nombre"
              )
              .toString(),
            value: "Nombre"
          },
          {
            sortable: false,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_administracion.modules.usuario.pages.usuario_list.header_list.primer_apellido"
              )
              .toString(),
            value: "Primer apellido"
          },
          {
            sortable: false,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_administracion.modules.usuario.pages.usuario_list.header_list.segundo_apellido"
              )
              .toString(),
            value: "Segundo apellido"
          },
          {
            sortable: false,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_administracion.modules.usuario.pages.usuario_list.header_list.usuario"
              )
              .toString(),
            value: "Usuario"
          },
          {
            sortable: false,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_administracion.modules.usuario.pages.usuario_list.header_list.cargo"
              )
              .toString(),
            value: "Cargo"
          },
          {
            sortable: false,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_administracion.modules.usuario.pages.usuario_list.header_list.activo"
              )
              .toString(),
            value: "Activo"
          },
          {
            sortable: false,
            align: "left",
            text: this.$i18n
              .t(
                "applications.onei_administracion.modules.usuario.pages.usuario_list.header_list.actions"
              )
              .toString(),
            value: "Acciones"
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

  .add_container {
    width: 100%;
  }

</style>
