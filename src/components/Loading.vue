<template>
    <div v-for="(n, index) in 5" :key="index">
      <div class="col">
        <div class="card shadow-sm">
          <img class="bd-placeholder-img card-img-top" v-bind:src="'/assets/icon/load.gif'" />
        </div>
      </div>
    </div>
</template>
