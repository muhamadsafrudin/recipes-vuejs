<script setup>

import Header from '../components/Header.vue';
import Section from '../components/Section.vue';
import Loading from '../components/Loading.vue';
import Notfound from '../components/Notfound.vue';
import Footer from '../components/Footer.vue';

</script>


<template>
  <Header @Cate="cat" />

  <main>
    <Section @Search="getsearch" />

    <div class="album py-5 bg-light">
      <div class="container">
        <h4 class="mb-3 text-center">{{ desctitle }}</h4>
        <Loading v-if="loading == true" />
        <Notfound :text="'Recipe not found!'" v-if="recipes == ''" />
        <div v-if="recipes != null" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div v-for="recipe in recipes">
            <div class="col">
              <div class="card shadow-sm">
                <img class="bd-placeholder-img card-img-top" v-bind:src="recipe.thumb" />
                <div class="card-body">
                  <h5>{{ recipe.title }}</h5>

                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <router-link :to="'/detail/' + recipe.key">
                        <button type="button" class="btn btn-sm btn-outline-secondary">Detail</button>
                      </router-link>
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

import axios from 'axios'
import APImakanan from '../axios/Api.js'



export default {

  data() {
    return {
      recipes: null,
      loading: true,
      desctitle : "",
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
        axios.get(APImakanan + "/recipes/index.php", {
          params: {
            category: category
          }
        })
          .then(response => {
            this.loading = false;
            this.recipes = response.data.results;
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        if (key) {
          axios.get(APImakanan + '/recipes/index.php', {
            params: {
              search: key
            }
          })
            .then(response => {
              this.loading = false;
              this.recipes = response.data.results;
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          axios.get(APImakanan + "/recipes/index.php")
            .then(response => {
              this.loading = false;
              this.recipes = response.data.results;
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    },

    getsearch(search = "") {

      this.$router.push({ path: '/home', query: { key: search } })

      this.loading = true;
      this.getRecipes('', search)

    },

    cat(data) {
      this.getRecipes(data);
    }


  }


}



</script>