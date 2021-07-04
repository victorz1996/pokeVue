<template>
  <div>
    <div class="mb-5" id="app">
      <Wellcome @iniciar="init($event)" v-if="wellcome" />
      <Loading v-if="loading" />
      <div class="container" v-if="!loading && listar">
        <Buscador @filtro="buscarPoke($event)" />
        <div v-if="!pokemonesFiltered.length">
          <NoExiste @volverInit="volver($event)" />
        </div>
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
    volver(even) {
      if (even) {
        this.wellcome = true;
        this.listar = false;
        this.pokemonesFavoritosFiltered = [];
      }
    },
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
    async obtenerPoke(nombre) {
      const resp = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${nombre}`
      );
      if (resp) {
        this.infoPoke = resp.data;
      }
    },
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
