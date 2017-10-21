<template lang="pug">
  div
    .recipe-list
      ul
        recipe-list-item(v-for="recipe in recipes" v-bind="recipe" :key="recipe.url" @selectRecipe="selectRecipe" @unselectRecipe="unselectRecipe")

    .shopping-list(v-if="selectedRecipes.length > 0")
      h3 Shopping List
      ul
        li(v-for="(weight, food) in selectedFoods")
          span {{food}}&nbsp;
          strong {{weight}}g / {{(weight/28.3495).toFixed(1)}}oz
</template>

<script>
import RecipeListItem from '@/components/RecipeListItem'
// import { flatten } from 'lodash'

export default {
  name: 'recipe-list',
  components: {
    'recipe-list-item': RecipeListItem
  },
  props: ['recipes'],
  data () {
    return {
      selectedRecipes: []
    }
  },
  computed: {
    selectedFoods () {
      let foods = {}
      this.selectedRecipes.map(recipe => {
        (recipe.foods || []).forEach(food => {
          foods[food.food_name] = foods[food.food_name] || 0
          foods[food.food_name] += food.serving_weight_grams
        })
      })
      return foods
    }
  },
  methods: {
    selectRecipe (recipe) {
      this.selectedRecipes.push(recipe)
    },
    unselectRecipe (recipe) {
      this.selectedRecipes.splice(this.selectedRecipes.indexOf(recipe), 1)
    }
  }
}
</script>

<style scope>
  .recipe-list {
    display: inline-block;
    float: left;
    width: 70%;
  }
  .shopping-list {
    display: inline-block;
    float: right;
    width: 30%;
  }
</style>
