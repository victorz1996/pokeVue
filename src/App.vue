<template>
  <div>
    <div class="mb-5" id="app">
      <!-- Componente de inicio de la app  -->
      <Wellcome @iniciar="init($event)" v-if="wellcome" />
      <!-- Componente de carga de la aplicacion  -->
      <Loading v-if="loading" />
      <!-- Listados de pokemones -->
      <div class="container" v-if="!loading && listar">
        <!-- Input para filtrar pokemones -->
        <Buscador @filtro="buscarPoke($event)" />
        <!-- Vista para cuando no existe la busqueda  -->
        <div v-if="!pokemonesFiltered.length">
          <NoExiste @volverInit="volver($event)" />
        </div>
        <!-- Lista de todos los pokemones -->
        <div v-show="listarTodos" class="mt-5 mb-5">
          <ul class="list-group">
            <li
              v-for="(pokemon, index) in pokemonesFiltered"
              :key="index"
              class="
                mb-2
                list-group-item
                d-flex
                justify-content-between
                align-items-center
              "
            >
              <span
                style="text-transform: capitalize"
                @click="obtenerPoke(pokemon.name)"
                class="mouser"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                {{ pokemon.name }}
              </span>
              <button @click="favorito(pokemon, index)" class="btn btn-circle">
                <font-awesome-icon
                  :class="{ favyellow: pokemon.fav, favwhite: !pokemon.fav }"
                  :id="index + 'all'"
                  icon="star"
                />
              </button>
            </li>
          </ul>
        </div>
        <!-- Lista de todos los pokemones favoritos -->
        <div v-show="listarFav" class="mt-5 mb-5">
          <ul class="list-group">
            <li
              style="text-transform: capitalize"
              v-for="(poke, index) in pokemonesFavoritosFiltered"
              :key="index"
              class="
                mb-2
                list-group-item
                d-flex
                justify-content-between
                align-items-center
              "
            >
              {{ poke.name }}
              <button class="btn btn-circle">
                <font-awesome-icon class="favyellow" icon="star" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <div v-if="!loading && listar && pokemonesFiltered.length">
      <Pie @listar="cambioLista($event)" />
    </div>
    <div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <img
                class="centerImg"
                height="150"
                v-if="infoPoke"
                :src="infoPoke.sprites.other.dream_world.front_default"
              />
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <ModalDetalle
                :pokes-favoritos="pokemonesFavoritos"
                :info-poke="infoPoke"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @namespace App
 * @description Componente principal de la aplicacion
 * @author       Victor Zabala <victorma164@gmail.com>
 */
import Wellcome from "../src/components/Welcome/Wellcome.vue";
import Loading from "../src/components/Loading/Loading.vue";
import Buscador from "../src/components/Buscador/Buscador.vue";
import Pie from "../src/components/Pie/Pie.vue";
import ModalDetalle from "../src/components/ModalDetalle/ModalDetalle.vue";
import NoExiste from "../src/components/NoExiste/NoExiste.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    Wellcome,
    Loading,
    Buscador,
    Pie,
    ModalDetalle,
    NoExiste,
  },
  data() {
    return {
      wellcome: true,
      loading: false,
      listar: false,
      pokemones: [],
      pokemonesFavoritos: [],
      pokemonesFiltered: [],
      pokemonesFavoritosFiltered: [],
      listarTodos: true,
      listarFav: false,
      infoPoke: null,
    };
  },
  methods: {
    /**
     * @memberOf App
     * @function volver volver
     * @description Metodo que se ejecuta para volver al inicio de la app
     * @param {Boolean} even
     */
    volver(even) {
      if (even) {
        this.wellcome = true;
        this.listar = false;
        this.pokemonesFavoritosFiltered = [];
      }
    },
    /**
     * @memberOf App
     * @function buscarPoke buscar pokemon
     * @description Metodo que se ejecuta para realizar la busqueda de los pokemones
     * @param {Boolean} event
     */
    buscarPoke(event) {
      if (this.listarTodos) {
        if (event.length) {
          this.pokemonesFiltered = this.pokemones.filter((poke) =>
            `${poke.name}`.toLowerCase().includes(event.toLowerCase())
          );
        } else {
          this.pokemonesFiltered = this.pokemones;
        }
      }
      if (this.listarFav) {
        if (event.length) {
          this.pokemonesFavoritosFiltered = this.pokemonesFavoritos.filter(
            (pok) => `${pok.name}`.toLowerCase().includes(event.toLowerCase())
          );
        } else {
          this.pokemonesFavoritosFiltered = this.pokemonesFavoritos;
        }
      }
    },
    /**
     * @memberOf App
     * @async
     * @function obtenerPoke obtener pokemon
     * @description Metodo que se ejecuta para obtener informacion de un pokemon
     * en especifico
     * @param {String} nombre
     */
    async obtenerPoke(nombre) {
      const resp = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${nombre}`
      );
      if (resp) {
        this.infoPoke = resp.data;
      }
    },
    /**
     * @memberOf App
     * @function cambioLista cambiar lista
     * @description Metodo que se ejecuta para cambiar la lista de pokemones que
     * se visualiza
     * @param {Boolean} event
     */
    cambioLista(event) {
      if (event === "todos") {
        this.listarTodos = true;
        this.listarFav = false;
      }
      if (event === "favoritos") {
        this.listarTodos = false;
        this.listarFav = true;
      }
    },
    /**
     * @memberOf App
     * @function favorito favorito
     * @description Metodo que se ejecuta para agregar o quitar pokemones
     * de las lista de favoritos
     * @param {Object} pokemon
     * @param {Int} index
     */
    favorito(pokemon, index) {
      this.pokemones[index].fav = !this.pokemones[index].fav;
      const element = document.getElementById(index + "all");
      if (pokemon.fav) {
        element.style.color = "rgb(228, 228, 9)";
      } else {
        element.style.color = "rgb(104, 103, 103)";
      }
      this.pokemonesFavoritos = this.pokemones.filter(
        (poke) => poke.fav === true
      );
      this.pokemonesFavoritosFiltered = this.pokemonesFavoritos;
    },
    /**
     * @memberOf App
     * @async
     * @function traerPokemons obtener pokemones
     * @description Metodo que se ejecuta para obtener informacion de todos los
     * pokemones
     */
    async traerPokemons() {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon");
      if (res.data) {
        this.pokemones = res.data.results;
        this.pokemones.forEach((item) => (item.fav = false));
        this.pokemonesFiltered = this.pokemones;
        this.loading = false;
        this.listar = true;
      }
    },
    /**
     * @memberOf App
     * @function init iniciar
     * @description Metodo que se ejecuta para iniciar la aplicacion
     * @param {Boolean} e
     */
    init(e) {
      if (e) {
        this.wellcome = false;
        this.loading = true;
        this.traerPokemons();
      }
    },
  },
};
</script>

<style>
.centerImg {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.btn-close {
  position: absolute;
  top: 20px;
  right: 11px;
}
.modal-header {
  height: 200px;
  background: url(assets/fondo-header.png);
}
.mouser {
  cursor: pointer;
}
.favyellow {
  color: rgb(228, 228, 9);
  height: 20px;
}
.favwhite {
  color: rgb(104, 103, 103);
  height: 18px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background: #faf9f9;
}
.row {
  --bs-gutter-x: 0;
}
.btn-circle {
  width: 40px;
  height: 40px;
  padding: 6px 0px;
  border-radius: 20px;
  text-align: center;
  font-size: 12px;
  background: rgb(238, 236, 234);
  line-height: 1.42857;
}
.mouse {
  cursor: progress;
}
</style>
