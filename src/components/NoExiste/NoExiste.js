/**
 * @namespace NoExiste
 * @description Componente que contiene la informacion que se muestra cuando no
 * existen coincidencias en la busqueda
 * @author       Victor Zabala <victorma164@gmail.com>
 */
export default {
    
    methods: {
        /**
        * @memberOf NoExiste
        * @function volverInicio Volver al inicio
        * @description Metodo que se sirve para volver al inicio de la aplicacion
        */
        volverInicio(){
            this.$emit('volverInit', true)
        }
    },
}