<script setup>

import Header from '../components/Header.vue';
import Notfound from '../components/Notfound.vue';
import SectionCus from '../components/SectionCus.vue';
import Footer from '../components/Footer.vue';

</script>


<template>

<Header />

<main>

  <SectionCus :title="'Favorite'" />


  <div class="album py-5 bg-light">
    <div class="container">
      
      <Notfound :text="'No favorite recipe'" v-if="recipes == ''" />

      <div v-if="recipes != null" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

      
        <div v-for="recipe in recipes">

          <div class="col">
            <div class="card shadow-sm">
              <!-- <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> -->
              <img class="bd-placeholder-img card-img-top" v-bind:src="recipe.thumb">
              <div class="card-body">
                <h5>{{ recipe.title }}</h5>

                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <router-link :to="'/detail/'+recipe.key">
                      <button  type="button" class="btn btn-sm btn-outline-success">Detail</button>
                    </router-link>
                    <button @click="removeFav(recipe.key)"  type="button" class="btn btn-sm btn-outline-danger mx-2">Delete</button>
                  </div>
                  <small class="text-muted">{{ recipe.dificulty }}</small>
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

import { setCookie } from "../assets/Script.js";

export default {

    data () {
      return {
        recipes: null,
        loading : false
      }
    },
    mounted () {

      this.getFavorites();
    },
    methods: {

        getFavorites() {
           
          var recipes = [];
          var get_fav = document.cookie.split(';');
          for(var i=0; i<get_fav.length; i++){
            var recipe = get_fav[i].split("=");
              var cek = recipe[0].split("_");
              if(cek[0].length > 4){
                  var str = cek[0].replace(/\s/g, '');
                  if(str == 'recipe'){
                    var obj_recipe = { };
                    var arr =  recipe[1].split("|~")
                    obj_recipe.title = arr[0];
                    obj_recipe.key = arr[1];
                    obj_recipe.thumb = arr[2];
                    recipes.push(obj_recipe);
                  }
              }


          }

          this.recipes = recipes;

        },

        removeFav(key)  {
          setCookie("recipe_"+key, "", "");
          this.getFavorites();
        } 
      
    }


}



</script>