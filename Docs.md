Documentación de las features adicionadas:
1. Sobre la cache de apollo:
   * Intro:
     * La politica de fetch usada por defecto en apollo es cache-first.
         Por lo tanto una query solo irá al server una vez.
   * Problemas:
     * El estado de los elemntos cargados nunca se actualiza,
    ya sea al adicionar modificar o eliminar un elemento, es decir los cambios van al server y se ejecutan pero la vista no se actualiza.
   * Solución:
     * Al editar un elemento la mutation debe devolver el mismo type de la query de listar, ejemplo (en el Backend):
     * Si la query utilizada para listar persona es: `listarPersonas:[Persona]`.La mutation de modificar persona debe ser
         `modifcarPersona(..):Persona`
     * Al adicionar o eliminar un elemento se debe invalidar la cache
    de apollo para que vuelva a traer los datos nuevos del server.
       ```
          //update de la mutacion.
           update(){
             this.$apolloCache.invalidateQuery('nombreDeLaQuery');
           }
       ```

     * Cuando se carga el componente donde se lista se debe usar:

        ```
         beforeCreate(){
              this.$apolloCache.invalidateQuery('queryName');
            }
        ```

2. Sobre los permisos:
   * Intro:
     * Algunos componentes solo deben ser visibles cuando el usuario
      autenticado tiene los permisos necesarios.
   * Solución:
     * Usar la directiva `v-permisos`, ejemplo:
     ```
     <componente v-permisos:only="['permiso1','permiso2']">
     ```
3. Sobre los filtros:
   * Intro:
     * Varias vistas tiene filtros para sus datos.
   * Problemas:
     * Código duplicado, estandarización de los filtros, etc.
   * Solución:
     * Mixin para mantener actualizado el modelo de los filtros, y `<generic-filter>`.
       * Uso:
           ```
                //en el page.vue que contiene el componente que lista
                <generic-filter
                    :only="['mercado','tipologia','codigo']"
           ></generic-filter>
           <componente-que-lista></componente-que-lista>
            ```
       * Luego en el componente que lista, importar el mixin `filterable` y
        agregarlo las opciones del componente `mixins:[filterable]`.
        Con esto se tendra en el componente un objeto `filterModel` el
        cual se actualiza cuando se cambio el valor de un filtro.
4. Sobre el estado del mes:
   * Problema:
     * En algunos lugares es necesario saber el estado del mes, y que sea reactivo
     ese estado es decir que cuando cambie el estado del mes se actualice la vista.
   * Solución:
     * Mixin `mesState`, de esta forma se tiene en el componente una propiedad computada
       `isMesCerrado(): Boolean`, Suponiendo que un componente se debe mostrar solo si el mes no está cerrado:
            `<componente v-if="isMesCerrado">`
