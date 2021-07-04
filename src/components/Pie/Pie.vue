<template>
  <nav class="centerClass navbar fixed-bottom navbar-dark bg-light">
    <button @click="cambioLista('todos')" id="todos" class="btn botonPie">
      <font-awesome-icon class="iconPosition" icon="bars" />All
    </button>
    <button
      @click="cambioLista('favoritos')"
      id="favoritos"
      class="btn botonPie"
    >
      <font-awesome-icon class="iconPosition" icon="star" />Favorites
    </button>
  </nav>
</template>

<script src="./Pie.js"></script>
<style lang="css" src="./Pie.css"></style>