<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-layout align-center justify-center row>
    <v-flex lg12 md12 sm12 xs12>
      <v-card class="elevation-5">
        <v-layout fill-height justify-space-around pa-3 row wrap>
          <v-flex md6 sm12 xs12>

            <v-treeview
              loading-icon="mdi-loading"
              :load-children="loadChildren"
              :open="open"
              :active.sync="active"
              :items="propClassifiers"
              item-children="childrens"
              item-key="id"
              item-text="description"
              return-object
              transition
              activatable
              ref="treeView"
            >
              <template v-slot:label="{item}">
                {{`${item.code}---${item.description}`}}
              </template>
              <template v-slot:append="{ item, open, active }">
                <v-item-group>
                  <v-item v-if="item.level < 6">
                    <v-btn color="green" flat icon>
                      <v-icon @click.stop="addChild(item)">add</v-icon>
                    </v-btn>
                  </v-item>
                  <v-item v-if="item.level > 1">
                    <v-btn color="red" flat icon>
                      <v-icon @click="deleteI(item)">delete_forever</v-icon>
                    </v-btn>
                  </v-item>
                </v-item-group>
              </template>
            </v-treeview>
          </v-flex>
          <v-divider></v-divider>
          <v-flex md6 sm12 xs12>
            <v-layout fill-height align-center justify-center pa-3 row wrap>
              <v-scroll-y-transition mode="out-in">
                <div
                  class="title grey--text text--lighten-1 font-weight-light"
                  style="align-self: center;"
                  v-if="!selected && !add"
                >
                  <v-card-text class="mt-3 text-md-center text-xs-center">
                    <v-avatar
                      color="grey lighten-2" size="180">
                      <v-icon class="" color="grey lighten-1" size="130">event_note</v-icon>
                    </v-avatar>
                    <v-card-text>Gestionar clasificadores</v-card-text>
                  </v-card-text>
                </div>
                <div :key="selected.id" v-else-if="selected">
                  <clasificador-add :data="selected"></clasificador-add>
                </div>
                <div :key="-1" v-else>
                  <clasificador-add :data="add"></clasificador-add>
                </div>
              </v-scroll-y-transition>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import Vue from "vue";
  import {IClassifier} from "@/applications/onei/domain/ipc/components/clasificador/interfaces/ITreeView";
  import {VScrollYTransition} from "@vuetify/components/transitions";
  import {VAvatar} from "@vuetify/components/VAvatar";
  import {VBtn} from "@vuetify/components/VBtn";
  import {VCard, VCardText, VCardTitle} from "@vuetify/components/VCard";
  import VDivider from "@vuetify/components/VDivider";
  import {VSpacer} from "@vuetify/components/VGrid";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import {VIcon} from "@vuetify/components/VIcon";
  import VImg from "@vuetify/components/VImg";
  import {VItem, VItemGroup} from "@vuetify/components/VItemGroup";
  import {VToolbar, VToolbarTitle} from "@vuetify/components/VToolbar";
  import {VTreeview} from "@vuetify/components/VTreeview";
  import ClasificadorAdd from "./ClasificadorAdd";

  export default Vue.extend( {
    name: "clasificador-tree-view",
    components: {
      VSpacer,
      VToolbar,
      VToolbarTitle,
      VTreeview,
      VIcon,
      VBtn,
      VItemGroup,
      VItem,
      VCard,
      VCardText,
      VCardTitle,
      VFlex,
      VLayout,
      VContainer,
      VContent,
      VAvatar,
      VImg,
      VDivider,
      VScrollYTransition,
      ClasificadorAdd
    },
    props: {
      propClassifiers: {
        type: Array,
        required: true
      },
      loadChildrens: {
        type: Object,
        required: false
      }
    },
    data() {
      const elm: IClassifier[] = this.propClassifiers;
      return {
        open: [],
        active: [] as IClassifier[],
        items: elm,
        add: null,
        update: true,
      };
    },
    mounted() {
      this.$refs.treeView.$on('update:open', (data) => {
        if (data.flag) {
          data = [];
          data = [...this.open];
        } else if (this.open.length > data.length) {
          data = [...this.open];
        } else {
          this.open = [...data];
        }
      });
    },
    created() {
      this.$eventBus.$on("add", ({id, code, level, classifierType, action, childrens, parent}) => {
        this.active = [];
        const idclassifierType = classifierType.id;
        this.add = {id, code, level, action, classifierType, parent, childrens};
      });
      this.$eventBus.$on("edit", data => {
        if (data) {
          if (data.level === 0) {
            this.active = [];
          }
          this.add = false;
        }
      });
      this.$eventBus.$on("delete", item => {
        this.active = [];
        this.add = false;
        for (let i = 0; i < this.items.length; i++) {
          if (this.recursive(this.items[i], item.id)) {
            break;
          }
        }
      });
    },
    computed: {
      selected(): any {
        this.$eventBus.$emit("edit", this.active[0]);
        return this.active[0];
      }
    },
    methods: {
      loadChildren(item):any {
        const tempQuery = {...this.loadChildrens};
        tempQuery['variables'].id = item.id;
        return this.$apollo.query(tempQuery).then(({data}) => {
          if (data.classifiers[0].classifierType.codeClassifier < 6) {
            const map = data.classifiers[0].childrens.map(it => {
              if (it.classifierType.codeClassifier < 6) {
                return {...it, childrens: []}
              } else {
                return it;
              }
            });
            return [...item.childrens, map];
          }
        });
      },
      addChild(item: any, open):void {
        const addItem = {...item, action: "add"};
        this.$eventBus.$emit("add", addItem);
        this.open.push(item);
        this.$refs.treeView.$emit('update:open', {items: [item], flag: true});
      },
      deleteI(item: any):void {
        this.$eventBus.$emit("delete", item);
      },
    }
  });
</script>
