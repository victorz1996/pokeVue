<template>
  <div v-if="infoPoke">
    <ul class="list-group list-group-flush mb-4">
      <li style="text-transform: capitalize" class="list-group-item">
        <strong>Name: </strong> {{ infoPoke.forms[0].name }}
      </li>
      <li class="list-group-item">
        <strong>Weght: </strong> {{ infoPoke.weight }}
      </li>
      <li class="list-group-item">
        <strong>Height: </strong> {{ infoPoke.height }}
      </li>
      <li style="text-transform: capitalize" class="list-group-item">
        <strong>Types: </strong> {{ msn }}
      </li>
    </ul>
    <button
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
      v-clipboard:copy="portapapel"
      class="btn botonModal"
    >
      Share to my friends
    </button>
    <button class="btn btn-circleModal iconoModal">
      <font-awesome-icon
        v-show="esFavorito"
        style="color: rgb(228, 228, 9)"
        icon="star"
      />
      <font-awesome-icon
        v-show="!esFavorito"
        style="color: rgb(104, 103, 103)"
        icon="star"
      />
    </button>
  </div>
</template>

<script src="./ModalDetalle.js"></script>
<style lang="css" src="./ModalDetalle.css"></style>