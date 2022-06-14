import axios from 'axios'

const API_URL = '/api/shops'
const API_URL_MORE = '/api/shops/'

// Create shop
const createShop = async (shopData) => {
    const response = await axios.post(API_URL, shopData)
    console.log(response.data)
    return response.data
}

const shopService = {
  createShop
}

export default shopService
