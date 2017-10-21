import Vue from 'vue'
import Vuex from 'vuex'
import { guid } from '@/utils'
import scraper from '@/api/RecipeManagerScraper'
import nutritionix from '@/api/Nutritionix'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    recipes: []
  },
  getters: {
    filteredRecipes: (state, getter) => (query) => {
      const regex = new RegExp(query, 'i')
      return state.recipes.filter(function (recipe) {
        return regex.test(recipe.name) ||
              regex.test(recipe.description) ||
              regex.test(recipe.url)
      }).sort(function (a, b) {
        return a.createdAt < b.createdAt
      })
    },
    getRecipeById: (state, getters) => (id) => {
      return state.recipes.find(recipe => recipe.id === id)
    }
  },
  mutations: {
    ADD_RECIPE (state, { recipe }) {
      state.recipes.push(recipe)
    },
    REMOVE_RECIPE (state, { recipe }) {
      const oldRecipe = state.recipes.find(r => r.id === recipe.id)
      state.recipes.splice(state.recipes.indexOf(oldRecipe), 1)
    },
    UPDATE_RECIPE (state, { recipe }) {
      const oldRecipe = state.recipes.find(r => r.id === recipe.id)
      state.recipes.splice(state.recipes.indexOf(oldRecipe), 1, recipe)
    }
  },
  actions: {
    async ADD_RECIPE (context, { recipe }) {
      recipe.id = guid()
      recipe.createdAt = new Date()
      const resp = await scraper.getRecipeFromUrl(recipe.url)
      const data = resp.data
      if (data) {
        recipe.name = data.title
        recipe.description = data.description
        recipe.imageUrl = data.image
        recipe.steps = data.directions
        recipe.time = data.time
        recipe.ingredients = data.ingredients
        recipe.servings = data.servings

        if (recipe.ingredients) {
          const iresp = await nutritionix.getIngredientsFromString(data.ingredients.join('\n'))
          recipe.foods = iresp.data.foods
        }
      }

      this.commit('ADD_RECIPE', {recipe: recipe})
    },
    REMOVE_RECIPE (context, { recipe }) {
      this.commit('REMOVE_RECIPE', {recipe: recipe})
    },
    UPDATE_RECIPE (context, { recipe }) {
      this.commit('UPDATE_RECIPE', { recipe: recipe })
    }
  }
})
