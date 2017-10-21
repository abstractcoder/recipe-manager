<template lang="pug">
  form(@submit.prevent="updateRecipe")
    div
      label URL
      input(type="url" v-model="recipe.url")
    div
      label Image URL
      input(type="url" v-model="recipe.imageUrl")
    div
      label Name
      input(type="text" v-model="recipe.name")
    div
      label Description
      textarea(v-model="recipe.description")
    //- div
    //-   label Ingredient List
    //-   textarea(v-model="recipe.ingredientList")
    div
      label Servings
      input(type="number" v-model.number="recipe.servings")

    a(href="#" @click.prevent="$router.go(-1)") [Back]
    | &nbsp;
    a(href="#" style="color: red;" @click.prevent="destroy") [Delete]
    | &nbsp;
    button Save Change
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  name: 'recipe-edit',
  data () {
    return {
      recipe: {
        id: '',
        url: '',
        name: '',
        description: '',
        imageUrl: '',
        ingredientList: '',
        servings: null,
        time: null
      }
    }
  },
  // props: ['url', 'name', 'description', 'imageUrl', 'ingredientList', 'servings', 'time'],
  created () {
    const recipe = this.$store.getters.getRecipeById(this.$route.params.recipeId)
    this.recipe = cloneDeep(recipe)
  },
  methods: {
    async updateRecipe () {
      await this.$store.dispatch('UPDATE_RECIPE', {recipe: this.recipe})
      this.$router.go(-1)
    },
    destroy () {
      this.$store.dispatch('REMOVE_RECIPE', {recipe: this.recipe})
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

form label {
  display: inline-block;
  width: 200px;
}

form input, form textarea {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
}
</style>
