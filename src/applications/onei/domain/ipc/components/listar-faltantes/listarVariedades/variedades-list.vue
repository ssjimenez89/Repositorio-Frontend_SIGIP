<template>
    <!--<div class="contenedor">-->
      <!--&lt;!&ndash;<div class="suma">&ndash;&gt;-->
        <!--&lt;!&ndash;<p>Digite el precio total de las variedades captadas</p>&ndash;&gt;-->
        <!--&lt;!&ndash;<v-text-field&ndash;&gt;-->
          <!--&lt;!&ndash;label="Precio"&ndash;&gt;-->
          <!--&lt;!&ndash;v-model="precioActual"&ndash;&gt;-->
        <!--&lt;!&ndash;&gt;</v-text-field>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->

      <!--<div class="lista">-->
        <!--<ul>-->
          <!--<li v-for="variedad in Object.values(data)">-->
            <!--<div class="desc">-->
              <!--{{variedad.variedadDescription}}-->

            <!--</div>-->
            <!--<div class="precio">-->
              <!--${{variedad.precio}}-->
            <!--</div>-->
          <!--</li>-->

        <!--</ul>-->
        <!--<div class="total">-->
          <!--Total:&nbsp<b> {{total}}</b>-->
        <!--</div>-->
      <!--</div>-->

    <!--</div>-->

    <v-layout column>
      <v-flex>
        Listado de precios captados:
      </v-flex>

      <v-flex >
        <div  class="scrollable" v-bar>
          <div>
        <v-card>

          <!--<v-toolbar color="blue" dark>-->
            <!--&lt;!&ndash;<v-toolbar-side-icon></v-toolbar-side-icon>&ndash;&gt;-->

            <!--<v-toolbar-title>Inbox</v-toolbar-title>-->

            <!--<v-spacer></v-spacer>-->

            <!--&lt;!&ndash;<v-btn icon>&ndash;&gt;-->
              <!--&lt;!&ndash;<v-icon>search</v-icon>&ndash;&gt;-->
            <!--&lt;!&ndash;</v-btn>&ndash;&gt;-->

            <!--&lt;!&ndash;<v-btn icon>&ndash;&gt;-->
              <!--&lt;!&ndash;<v-icon>check_circle</v-icon>&ndash;&gt;-->
            <!--&lt;!&ndash;</v-btn>&ndash;&gt;-->
          <!--</v-toolbar>-->

              <div>
                <v-list two-line dense>


                  <div v-for="(variedad, index) in Object.values(data)" >
                    <v-list-tile
                      :key="variedad.variedadDescription"
                      avatar
                      ripple
                      @click="total"
                    >
                      <v-list-tile-content>
                        <v-list-tile-title>{{variedad.variedadDescription}}</v-list-tile-title>
                        <!--<v-list-tile-sub-title class="text&#45;&#45;primary">{{variedad.variedadDescription}}</v-list-tile-sub-title>-->
                        <v-list-tile-sub-title>{{variedad.observacion.description}}</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-list-tile-action-text>${{variedad.precio}}</v-list-tile-action-text>


                        <!--<v-icon-->

                        <!--color="yellow darken-2"-->
                        <!--&gt;-->
                        <!--star-->
                        <!--</v-icon>-->
                      </v-list-tile-action>

                    </v-list-tile>
                    <v-divider
                      v-if="index + 1 < Object.values(data).length"
                      :key="index"
                    ></v-divider>
                  </div>

                </v-list>
              </div>


        </v-card>
          </div>
        </div>
      </v-flex>
      <v-flex>
        <p>
          La suma de los precios de las variedades captadas es <b>${{total}}</b>. Si es el valor correcto haga click en aceptar.
        </p>
      </v-flex>
    </v-layout>
  </template>


<script>
  import VDivider from "@vuetify/components/VDivider";

  import VTextField from "@vuetify/components/VTextField";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import {VList, VListTile, VListTileAction, VListTileContent, VListTileTitle,VListTileSubTitle,VListTileActionText} from "@vuetify/components/VList";
  import VDialog from "@vuetify/components/VDialog";
  import {VCard, VCardActions, VCardText, VCardTitle} from "@vuetify/components/VCard";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VBtn from "@vuetify/components/VBtn";

  import VIcon from "@vuetify/components/VIcon";
  import {VToolbar, VToolbarTitle} from "@vuetify/components/VToolbar";
    export default {
        name: "variedades-list",
      components:{
        VListTileSubTitle,
        VListTileActionText,
        VListTile,
        VListTileAction,
        VListTileContent,
        VListTileTitle,
        VSpacer,
        VFlex,
        VToolbar,
        VToolbarTitle,
        VDivider,
        VLayout,
        VCard,
        VCardActions,
        VCardText,
        VCardTitle,
        VBtn,
        VList,
        VIcon
      },
      props:{
          data:{
            required: true,
            type: Object,
            default: {}
          }
      },
      computed: {
          total(){
            let cant = 0;
            Object.values(this.data).forEach(e=>{
              cant += parseFloat(e.precio);
              console.log(e.precio);
            });
            console.log(cant);
            return cant;
          }
      }
    }
</script>

<style lang="stylus" scoped>
p
  margin 0
.scrollable
  height 260px

.contenedor
  display flex
  .lista
    min-width 300px
    padding-left 8px
    ul
      overflow auto
      max-height 300px
      list-style none
      padding 0
      li
        min-height 45px
        border-bottom 0.5px solid
        min-width 180px
        .desc
          padding-top 10px
          font-weight bold
        .precio
          color gray
          padding-right 10px
          font-size 12px
          display flex
          justify-content flex-end
     .total
      margin-top 8px
      font-style italic
      padding-right 10px
      display flex
      justify-content flex-end
  .suma
    padding-top 10px
    width 150px
    display flex
    flex-direction column
    justify-content center
    p
      justify center
</style>
