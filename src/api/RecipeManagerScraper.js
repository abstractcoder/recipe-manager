import axios from 'axios'

class RecipeManagerScraper {
  getRecipeFromUrl (url) {
    return axios.get('https://recipe-manager-scraper.now.sh/fetch', {
      params: {
        url: url
      }
    })
  }
}

export default new RecipeManagerScraper()
