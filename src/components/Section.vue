<template>
  <section class="py-4 text-center container">
    <div class="row">

      <div class="col-md-7 col-xl-5">
        <div class="text-start">
          <h2 class="display-5">Masak apa kita hari ini ?</h2>
          <p>
            Memasaklah dari hati, itu kunci utama masakan yang enak.
          </p>
          <div class="input-group mb-3">
            <input @keyup.enter="searchRecipe()" id="search-recipe" v-model="search" type="text" autocomplete="off" class="form-control" placeholder="search recipe..." aria-describedby="button-addon2">
            <button @click="searchRecipe()" class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fa fa-search"></i></button>
          </div>
        </div>
      </div>

      <div class="col-md"></div>

    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
    searchRecipe() {
      this.$emit('Search', this.search);
    },
  },
};


</script>
