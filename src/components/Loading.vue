
<template>
    <div v-for="(n, index) in 6" :key="index">
      <div class="col">
        <div class="card shadow-sm">
          <Skeletor :shimmer="true" height="280"/>
        </div>
      </div>
    </div>
</template>

<script>
  import "../assets/skeleton.css";
  import { Skeletor } from 'vue-skeletor';

  export default {
    components: { Skeletor }
  }

</script>