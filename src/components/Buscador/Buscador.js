export default {
    name: 'Buscador',
    data() {
        return {
            buscarInp: '',
        }
    },
    methods: {
        filtrar(){
            this.$emit('filtro', this.buscarInp)
        }
    },
}