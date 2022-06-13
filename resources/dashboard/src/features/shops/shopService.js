import axios from 'axios'

const API_URL = '/api/shops/'

// Create shop
const createShop = async (shopData) => {
    const response = await axios.post(API_URL, shopData)
    return response.data
}

const shopService = {
  createShop
}

export default shopService
