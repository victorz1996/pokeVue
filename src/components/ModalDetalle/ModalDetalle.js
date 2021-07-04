export default {
    name: "ModalDetalle",
    props: {infoPoke: {type: Object},
    pokesFavoritos: {type: Array}},
    data() {
        return {
            msn: '',
            esFavorito: false,
            portapapel: '',
        }
    },
    watch: {
        infoPoke(){
            this.obtenerTipos()
            const arrayMsn = this.msn.split(',')
            arrayMsn.splice(arrayMsn.length-1,1)
            this.msn = arrayMsn.toString()
            this.encontrarFavorito()
            this.modificarPortapapel()
        }
    },
    methods: {
        onCopy(e) {
            alert(`Copiado al portapapeles exitosamente: \n${e.text}`)
          },
        onError() {
            alert('Falló la copia')
        },
        modificarPortapapel(){
            if(this.infoPoke){
                this.portapapel = `Name: ${this.infoPoke.forms[0].name}\n Weight: ${this.infoPoke.weight}\n Height: ${this.infoPoke.height}\n Types: ${this.msn}`
            }
        },
        encontrarFavorito(){
            if(this.pokesFavoritos && this.pokesFavoritos.length){
                const existe = this.pokesFavoritos.find(poke => poke.name === this.infoPoke.forms[0].name)
                if(!existe){
                    this.esFavorito = false
                } else {
                    this.esFavorito = true
                }
            }
        },
        obtenerTipos(){
            this.msn = ''
            if(this.infoPoke){
                this.infoPoke.types.forEach(item => {
                    this.msn += `${item.type.name},`
                });
            }
        }
    },
}