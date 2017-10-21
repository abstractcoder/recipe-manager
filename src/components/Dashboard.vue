<template lang="pug">
  .dashboard
    h1 Recipe Manager ({{filteredRecipes.length}})
    input(type="search" placeholder="Paste url or search" v-model="query" @keydown.enter.prevent.trim="search")
    recipe-list(v-bind:recipes="filteredRecipes")
</template>

<script>
// import { mapActions } from 'vuex'
import RecipeList from '@/components/RecipeList'
import { validUrl } from '@/utils'

export default {
  name: 'Dashboard',
  components: {
    'recipe-list': RecipeList
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    search () {
      if (validUrl(this.query) && this.filteredRecipes.length === 0) {
        this.$store.dispatch('ADD_RECIPE', {
          recipe: {
            url: this.query
          }
        })
        this.query = ''
      }
    }
  },
  computed: {
    filteredRecipes () {
      return this.$store.getters.filteredRecipes(this.query)
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}

.dashboard {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

input[type=search] {
  width: 100%;
  font-size: 48px;
  line-height: 2.0;
}
</style>
