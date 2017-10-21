import axios from 'axios'

class Nutritionix {
  getIngredientsFromString (str) {
    return axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients',
      {
        query: str,
        timezone: 'US/Eastern'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': process.env.NUTRITIONIX_APP_ID,
          'x-app-key': process.env.NUTRITIONIX_APP_KEY
        }
      }
    )
  }
}

export default new Nutritionix()
