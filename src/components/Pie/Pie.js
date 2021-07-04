export default {
    name: "Pie",
    mounted() {
        this.cambioLista('todos')
    },
    methods: {
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