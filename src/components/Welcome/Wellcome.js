/**
 * @namespace Wellcome
 * @description Componente que contiene la informacion que se muestra en el inicio de la
 * aplicacion
 * @author       Victor Zabala <victorma164@gmail.com>
 */
export default {
    name: 'Wellcome',
    methods: {
      /**
        * @memberOf Wellcome
        * @function iniciar inicio de la app
        * @description Metodo que se ejecuta para emitir informacion referente al inicio
        * de la aplicacion
        */
      iniciar(){
        this.$emit('iniciar', true)
      }
    },
}