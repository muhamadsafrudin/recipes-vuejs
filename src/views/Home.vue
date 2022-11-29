<script setup>

import Header from '../components/Header.vue';
import Section from '../components/Section.vue';
import Loading from '../components/Loading.vue';
import Notfound from '../components/Notfound.vue';
import Footer from '../components/Footer.vue';
import InfiniteLoading from "v3-infinite-loading";

</script>

<template>
  <Header @Cate="cat" />
  <main>
    <Section @Search="getsearch" />

    <div class="album py-5 bg-light">
      <div class="container">
        <h4 class="mb-3 text-center">{{ desctitle }}</h4>
        <Notfound :text="'Recipe not found!'" v-if="recipes == ''" />
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div v-for="recipe in recipes" :key="recipe.key">
            <router-link class="text-decoration-none" :to="'/detail/' + recipe.key">
            <div class="col">
              <div class="card shadow-sm">
                <img class="bd-placeholder-img card-img-top" v-bind:src="recipe.thumb" />
                <div class="card-body">
                  <h5 class="text-dark">{{ recipe.title }}</h5>
                  <!-- <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">{{ recipe.dificulty }}</small>
                  </div> -->
                </div>
              </div>
            </div>
           </router-link>
          </div>
        </div>
        <Loading v-if="loading == true" />  
        <InfiniteLoading :firstload="false" @infinite="loadData" />
      </div>
    </div>
  </main>
  <div class="text-center my-2">
      <div >
      </div>
 </div>
  <Footer />
</template>

<script>

import axios from 'axios'
import APi from '../axios/Api.js'

let APImakanan = APi.APimakanan
axios.defaults.headers.common = APi.APiKey;

export default {

  data() {
    return {
      recipes     : [],
      loading     : true,
      desctitle   : "",
      page        : 1
    }
  },
  mounted() {

    this.getRecipes();

  },

  methods: {

    getRecipes(category = this.$route.params.key, key = this.$route.query.key) {

      this.recipes = null;
      this.loading = true;
      if (category) {
        axios.get(APImakanan + "/recipes-category/:"+ category)
          .then(response => {
            this.loading = false; 
            this.recipes = response.data.data;
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        if (key) {
          axios.get(APImakanan + '/search-recipes', {
            params : {
              "search" : key
            }
          })
            .then(response => {
              this.loading = false;
              this.recipes = response.data.data;
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          axios.get(APImakanan + "/recipes/1")
            .then(response => {
              this.loading = false;
              this.recipes = response.data.data;
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    },

    //    getRecipes(category = this.$route.params.key, key = this.$route.query.key) {

    //   this.recipes = null;
    //   this.loading = true;
    //   if (category) {
    //     axios.get(APImakanan + "/recipes/index.php", {
    //       params: {
    //         category: category
    //       }
    //     })
    //       .then(response => {
    //         this.loading = false; 
    //         this.recipes = response.data.results;
    //       })
    //       .catch(error => {
    //         console.log(error)
    //       })
    //   } else {
    //     if (key) {
    //       axios.get(APImakanan + '/recipes/index.php', {
    //         params: {
    //           search: key
    //         }
    //       })
    //         .then(response => {
    //           this.loading = false;
    //           this.recipes = response.data.results;
    //         })
    //         .catch(error => {
    //           console.log(error)
    //         })
    //     } else {
    //       axios.get(APImakanan + "/recipes/index.php", {
    //         params : {
    //           page : this.page
    //         }

    //       })
    //         .then(response => {
    //           this.loading = false;
    //           this.recipes = response.data.results;
    //         })
    //         .catch(error => {
    //           console.log(error)
    //         })
    //     }
    //   }
    // },

    getsearch(search = "") {

      this.$router.push({ path: '/home', query: { key: search } })

      this.loading = true;
      this.getRecipes('', search)

    },

    cat(data) {
      this.getRecipes(data);
    },

    loadData : function($state) {
      // console.log($state);
      if(this.loading == false && this.$route.params.key == null && this.$route.query.key == null){
        this.loading = true;
        this.page = this.page + 1;
  
        axios.get(APImakanan + "/recipes/index.php", {
          params : {
            page : this.page
          }
  
        })
          .then(response => {
            this.loading = false;
            let newRecipes = response.data.results;
            for(var i = 0; i < newRecipes.length; i++){
              this.recipes.push(newRecipes[i]);
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    }



  }


}



</script>