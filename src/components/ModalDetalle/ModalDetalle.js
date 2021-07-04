/**
 * @namespace ModalDetalle
 * @description Componente que contiene la informacion que se muestra en el modal
 * de infromacion detallada de cada pokemon.
 * @author       Victor Zabala <victorma164@gmail.com>
 */
export default {
    name: "ModalDetalle",
    props: {
        infoPoke: { type: Object },
        pokesFavoritos: { type: Array }
    },
    data() {
        return {
            msn: '',
            esFavorito: false,
            portapapel: '',
        }
    },
    watch: {
        /**
        * @memberOf ModalDetalle
        * @function infoPoke Watch de infoPoke
        * @description Metodo que se ejecuta cada vez que la variable de infoPoke cambia
        */
        infoPoke() {
            this.obtenerTipos()
            const arrayMsn = this.msn.split(',')
            arrayMsn.splice(arrayMsn.length - 1, 1)
            this.msn = arrayMsn.toString()
            this.encontrarFavorito()
            this.modificarPortapapel()
        }
    },
    methods: {
        /**
        * @memberOf ModalDetalle
        * @function onCopy copiar portapapeles
        * @description Metodo que se ejecuta para copiar informacion de un pokemon al
        * portapapeles.
        * @param {Object} e
        */
        onCopy(e) {
            alert(`Copiado al portapapeles exitosamente: \n${e.text}`)
        },
        /**
        * @memberOf ModalDetalle
        * @function onError Error portapapeles
        * @description Metodo que se ejecuta cuando ocurre un error en la copia de informacion
        * al portapapeles
        */
        onError() {
            alert('Falló la copia')
        },
        /**
        * @memberOf ModalDetalle
        * @function modificarPortapapel modifica portapapel
        * @description Metodo que se ejecuta para crear el string con la informacion que se copiara
        * al portapapeles
        */
        modificarPortapapel() {
            if (this.infoPoke) {
                this.portapapel = `Name: ${this.infoPoke.forms[0].name}\n Weight: ${this.infoPoke.weight}\n Height: ${this.infoPoke.height}\n Types: ${this.msn}`
            }
        },
        /**
        * @memberOf ModalDetalle
        * @function encontrarFavorito encontrar pokemon favorito
        * @description Metodo que se ejecuta para identificar en la informacion detallada
        * si el pokemon es favorito
        */
        encontrarFavorito() {
            if (this.pokesFavoritos && this.pokesFavoritos.length) {
                const existe = this.pokesFavoritos.find(poke => poke.name === this.infoPoke.forms[0].name)
                if (!existe) {
                    this.esFavorito = false
                } else {
                    this.esFavorito = true
                }
            }
        },
        /**
        * @memberOf ModalDetalle
        * @function obtenerTipos encontrar pokemon tipos
        * @description Metodo que se ejecuta para organizar la informacion que se 
        * mostrara en los tipos del pokemon
        */
        obtenerTipos() {
            this.msn = ''
            if (this.infoPoke) {
                this.infoPoke.types.forEach(item => {
                    this.msn += `${item.type.name},`
                });
            }
        }
    },
}