<template lang="pug">
  li(:style="styleObject")
    .media
      img.media-figure(v-bind:src="imageUrl" @click="toggleSelected")
      .media-body
        h3
          a(v-bind:href="url" style="color: #0275d8;" target="_blank") {{name || url}}
          | &nbsp;
          router-link(:to="{name: 'RecipeEdit', params: { recipeId: id }}" style="color: #f0ad4e;") ✎
        p
          em(v-if="calories") {{calories}} cal&nbsp;
          span(v-if="time.total")
            | ⏱&nbsp;
            em {{time.total}}
        p {{description}}
</template>

<script>
export default {
  name: 'recipe-list-item',
  data () {
    return {
      selected: false
    }
  },
  watch: {
    selected () {
      if (this.selected) {
        this.$emit('selectRecipe', this.$props)
      } else {
        this.$emit('unselectRecipe', this.$props)
      }
    }
  },
  props: ['id', 'url', 'name', 'description', 'imageUrl', 'foods', 'servings', 'time'],
  methods: {
    destroy () {
      this.$store.dispatch('REMOVE_RECIPE', {recipe: this.$data})
    },
    toggleSelected () {
      this.selected = !this.selected
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
    },
    styleObject () {
      return {
        background: (this.selected ? '#FFFFE0' : '#fff')
      }
    }
  }
}
</script>

<style scoped>
  li {
    border: 1px solid #ccc;
  }

  .media {
    display: flex;
    align-items: flex-start;
    max-height: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10px;
    position: relative;
  }

  .media-figure {
    margin-right: 1em;
  }

  .media-body {
    flex: 1;
  }

  img {
    height: 160px;
    width: 215px;
    display: inline-block;
    object-fit: cover;
    cursor: pointer;
  }
  h3 { margin: 0; }
  p { margin: 0px; }
  a {
    color: blue;
    font-weight: bold;
    text-decoration: none;
  }
  input[type=checkbox] {
    cursor: pointer;
    position: absolute;
    top: 5px;
    left: 5px;
  }
</style>
