<template>
  <section class="py-4 text-center container">
    <div class="row">
      <div class="col-md text-start">
        <h4 class="float-start">{{  title }}</h4>
        <!-- <router-link :go="-1"> -->
          <h3 @click="goBack()" style="cursor: pointer;" class="float-end"><i class="text-secondary far fa-arrow-alt-circle-left"></i></h3>
        <!-- </router-link> -->
      </div>


    </div>
  </section>
</template>

<script >

export default {

  props : [
    'title'
  ],

  methods : {
    goBack() {
      this.$router.go(-1);
      this.$emit("Refresh", true);
    }
  }

}

</script>

