export default {
    name: 'Wellcome',
    methods: {
      iniciar(){
        this.$emit('iniciar', true)
      }
    },
}