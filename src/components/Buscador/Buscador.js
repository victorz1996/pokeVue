/**
 * @namespace Buscador
 * @description Componente para realizar la busqueda de pokemones
 * @author       Victor Zabala <victorma164@gmail.com>
 */
export default {
    name: 'Buscador',
    data() {
        return {
            buscarInp: '',
        }
    },
    methods: {
        /**
        * @memberOf Buscador
        * @function filtrar funcion de filtro
        * @description Metodo que emite lo que el usuario escribe en el input de busqueda
        * para disparar la funcion de busqueda.
        */
        filtrar() {
            this.$emit('filtro', this.buscarInp)
        }
    },
}