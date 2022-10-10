<script setup>
import Header from "../components/Header.vue";
import Loading from "../components/Loading.vue";
import SectionCus from "../components/SectionCus.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <Header />

  <SectionCus :title="'Detail Resep'"/>

  <main>
    <div class="album py-5 bg-light">
      <div class="container">
        <Loading v-if="loading == true" />
        <div v-if="recipe != null">
          <div class="row px-2 py-3" style="background-color: white">
            <div class="mb-2 col-xl-7">
              <img
                style="border-radius: 5px; width: 100%"
                class="bd-placeholder-img card-img-top"
                :src="recipe.thumb == null ? '/assets/icon/noimage.jpeg' : recipe.thumb"
                alt="Images.."
              />
            </div>
            <div class="mb-2 col-xl">
              <div>
                <div class>
                  <div class>
                    <small class="float-end">
                      {{
                        recipe.author.user + ", " + recipe.author.datePublished
                      }}
                    </small>
                    <h5>Resep:</h5>
                  </div>
                  <div class="mt-5">
                    <h3 class="display-6">{{ recipe.title }}</h3>
                    <!-- <p>{{ recipe.desc }}</p> -->
                  </div>
                  <!-- <div class="mt-4 mb-2">
                    <div class="row">
                      <h6 class="col-4">
                        <i class="far fa-clock"></i>
                        {{ recipe.times }}
                      </h6>
                      <h6 class="col-4">
                        <i class="far fa-user-circle"></i>
                        {{ recipe.servings }}
                      </h6>
                      <h6 class="col-4">
                        <i class="fa fa-layer-group"></i>
                        {{ recipe.dificulty }}
                      </h6>
                    </div>
                  </div> -->
                  <div class="d-flex justify-content-start mt-5">
                      <button v-if="favorite == false" @click="eventFavorite(recipe.title, $route.params.key, recipe.thumb)" class="btn btn-success"><i class="fa fa-bookmark"></i> Tambah ke Favorit</button>
                      <button v-if="favorite == true" @click="eventFavorite(recipe.title, $route.params.key, recipe.thumb)" class="btn btn-danger"><i class="fa fa-bookmark"></i> Hapus dari Favorit</button>
                 </div> 
                </div>
              </div>
            </div>

            <div class="mb-2 col-xl-7">
              <div class="mb-2 border border-secondary border-3 rounded-2 p-2">
                <h5>Bahan bahan :</h5>
                <ul>
                  <li v-for="(ing, index) in recipe.ingredient" :key="index">{{ ing }}</li>
                </ul>
              </div>
              <div class="border border-secondary border-3 rounded-2 p-2">
                <h5>Langkah langkah :</h5>
                <ul>
                  <li v-for="(step,index) in recipe.step" :key="index">{{ step.substring(1) }}</li>
                </ul>
              </div>
            </div>

            <div class="mb-2 col-xl-5">
              <div class="pt-2">
                <h5>Resep & Tips Lainnya Untuk Anda:</h5>
                <div v-if="recipes != null" class="row">
                  <div v-for="(data, index) in recipes" :key="index" class=" col-6 mb-3">
                    <div @click="newDetail(data.key)"  class="col"> 
                      <div class="card shadow-sm">
                        <img style="cursor: pointer;" class="bd-placeholder-img card-img-top" v-bind:src="data.thumb" />
                        <div class="card-body">
                          <h6 style="cursor: pointer;" class="">{{ data.title }}</h6>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>

<script>
import axios from "axios";
import APImakanan from "../axios/Api.js";
import { setCookie, getCookie } from "../assets/Script.js";

export default {
  data() {
    return {
      recipe: null,
      recipes: null,
      loading: true,
      favorite:false,
    };

  },
  mounted() {

    this.getRecipe();
    this.cekFavorite();
  
  },
  methods: {

    Reload() {
    this.dataNull();
    this.getRecipe();
    this.cekFavorite();
  
    },

    dataNull() {
      this.recipe = null;
      this.recipes = null;
      this.loading = true;

    },

    getRecipe(data = this.$route.params.key) {
          axios
          .get(APImakanan + "/recipes/index.php", {
            params: {
              detail: data,
            },
          })
      .then((response) => {
        console.log(response)
        this.loading = false;
        this.recipe = response.data.results;  
        this.otherRecipes();
      })
      .catch((error) => {
        console.log(error);
      });

    },

    otherRecipes() {
      axios
        .get(APImakanan + "/recipes/index.php", {
          params: {
            limit: 4,
          },
        })
        .then((response) => {
          this.recipes = response.data.results;
        })
      
    },

    newDetail(data) {
        this.$router.push('/detail/'+data);
    },

    cekFavorite(data = this.$route.params.key) {
        const favorite = getCookie("recipe_"+ data)
        if(favorite != ""){
          this.favorite = true;
        }else{
          this.favorite = false;
        }
    },



    eventFavorite(title, key, thumb) {
      var data = title+"|~"+key+"|~"+thumb;
      if(this.favorite == false){
        this.favorite = true;
        setCookie("recipe_"+key, data, 5);
      }else{
        this.favorite = false;
        setCookie("recipe_"+key, data, "");
      }
    },

  },

  watch: {
    '$route.params': 'Reload',
  }
};
</script>
