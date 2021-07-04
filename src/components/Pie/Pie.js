/**
 * @namespace Pie
 * @description Componente que contiene la informacion que se muestra en el footer
 * de las seccion de listar pokemones
 * @author       Victor Zabala <victorma164@gmail.com>
 */
export default {
    name: "Pie",
    mounted() {
        this.cambioLista('todos')
    },
    methods: {
        /**
        * @memberOf Pie
        * @function cambioLista cambio de lista de pokemones
        * @description Metodo que se ejecuta para cambiar el listado de pokemones que se
        * visualizan
        * @param {Array} lista
        */
        cambioLista(lista) {
            const todos = document.getElementById('todos')
            const favoritos = document.getElementById('favoritos')
            if (lista === 'todos') {
                todos.style.background = '#f22539'
                favoritos.style.background = 'rgb(104, 103, 103)'
                this.$emit('listar', lista)
            }
            if (lista === 'favoritos') {
                todos.style.background = 'rgb(104, 103, 103)'
                favoritos.style.background = '#f22539'
                this.$emit('listar', lista)
            }

        },
    },
}