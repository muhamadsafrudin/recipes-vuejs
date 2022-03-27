<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-success shadow">
    <div class="container">
      <router-link :to="'/'" class="navbar-brand" href="#">
        <img
          src="/assets/icon/logo.png"
          alt
          width="35"
          height="29"
          class="d-inline-block align-text-top"
        />
        Dapurmu
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <div class="d-flex">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item ">
              <router-link
                active-class="active"
                :to="'/home'"
                class="nav-link"
                aria-current="page"
                href="#"
                >Home</router-link
              >
            </li> 
            <li class="nav-item mx-xl-3">
              <router-link 
                active-class="active"
                :to="'/favorite'" class="nav-link" href="#">
                <i class=""></i> Favorite
              </router-link>
            </li>
            <li class="nav-item  dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarScrollingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >Categorys</a
              >
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarScrollingDropdown"
              >
                <li v-for="category in categorys">
                  <router-link
                    @click="selectCat(category.key)"
                    :to="'/home/' + category.key"
                    class="dropdown-item"
                    href="#"
                    >{{ category.category }}</router-link
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import APimakanan from "../axios/Api";

export default {
  data() {
    return {
      categorys: null,
    };
  },

  mounted() {

    axios
      .get(APimakanan + "/categorys/index.php")
      .then((response) => {
        this.categorys = response.data.results;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    selectCat(data) {
      this.$emit("Cate", data);
    },
  },
};
</script>
