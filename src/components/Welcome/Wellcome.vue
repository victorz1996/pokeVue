<template>
  <div class="welcome">
    <div class="row">
      <div class="col-sm-12 d-flex justify-content-center aling-items-center">
        <img class="img" src="pikachu.png" />
      </div>
      <div class="col-sm-12 d-flex justify-content-center aling-items-center">
        <h5 class="mt-5">Welcome to Pokédex</h5>
      </div>
      <div class="col-sm-12 d-flex justify-content-center aling-items-center">
        <p class="text-center mt-3">
          The digital encyclopedia created by Professor Oak is an invaluable
          tool <br />
          to Trainers in the Pokémon world.
        </p>
      </div>
    </div>
    <div
      class="col-sm-12 mt-4 d-flex justify-content-center aling-items-center"
    >
      <button @click="iniciar" type="button" class="btn boton">Get started</button>
    </div>
  </div>
</template>
<script src="./Wellcome.js"></script>
<style lang="css" src="./Wellcome.css"></style>