<template>
  <div class="input-group input-group-lg sizeInput">
    <span class="input-group-text"><font-awesome-icon icon="search" /></span>
    <input
      type="text"
      class="form-control"
      placeholder="Search"
      @input="filtrar"
      v-model="buscarInp"
      aria-label="Search"
    />
  </div>
</template>
<script src="./Buscador.js"></script>
<style lang="css" src="./Buscador.css"></style>