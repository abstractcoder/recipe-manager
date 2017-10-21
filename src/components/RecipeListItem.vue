<template lang="pug">
  li
    .media
      img.media-figure(v-bind:src="imageUrl")
      .media-body
        h3
          input(type="checkbox")
          a(v-bind:href="url" style="color: #0275d8;") {{name || url}}
          | &nbsp;
          router-link(:to="{name: 'RecipeEdit', params: { recipeId: id }}" style="color: #f0ad4e;") ✎
        p(v-if="calories")
          em {{calories}} cal
        p {{description}}
</template>

<script>
export default {
  name: 'recipe-list-item',
  props: ['id', 'url', 'name', 'description', 'imageUrl', 'foods', 'servings'],
  methods: {
    destroy () {
      this.$store.dispatch('REMOVE_RECIPE', {recipe: this.$data})
    }
  },
  computed: {
    calories () {
      if (this.foods && this.servings) {
        let totalCalories = this.foods.map(food => food.nf_calories).reduce((sum, calories) => sum + calories, 0)
        return (totalCalories / this.servings).toFixed(0)
      } else {
        return null
      }
    }
  }
}
</script>

<style scoped>
  .media {
    display: flex;
    align-items: flex-start;
    max-height: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 20px;
  }

  .media-figure {
    margin-right: 1em;
  }

  .media-body {
    flex: 1;
  }

  img {
    max-height: 160px;
    display: inline-block;
  }
  h3 { margin: 0; }
  p { margin: 0px; }
  a {
    color: blue;
    font-weight: bold;
    text-decoration: none;
  }
  input[type=checkbox] {
    padding-bottom: 30px;
  }
</style>
