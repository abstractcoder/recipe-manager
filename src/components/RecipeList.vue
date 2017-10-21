<template lang="pug">
  ul.recipe-list
    recipe-list-item(v-for="recipe in recipes" v-bind="recipe" :key="recipe.url")
</template>

<script>
import RecipeListItem from '@/components/RecipeListItem'

export default {
  name: 'recipe-list',
  components: {
    'recipe-list-item': RecipeListItem
  },
  props: ['recipes']
}
</script>

<style>
</style>
