
<template>
    <div v-for="(n, index) in 5" :key="index">
      <div class="col">
        <div class="card shadow-sm">
          <!-- <img class="bd-placeholder-img card-img-top" v-bind:src="'/assets/icon/load.gif'" /> -->
          <Skeleton :width="'100%'" />
        </div>
      </div>
    </div>
</template>

<script>

  import { Skeletor } from 'vue-skeletor';

  export default {
    components: { Skeletor }
  }

</script>