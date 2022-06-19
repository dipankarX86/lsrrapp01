import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter';

const API_URL = '/api/shops'

// Create shop
const createShop = async (shopData, token) => {
  console.log(shopData) //

  // setting up case converter options
  const options = {
    ignoreHeaders: true
  };
  const client = applyCaseMiddleware(axios.create(), options);

  // setting up the bearer token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await client.post(API_URL, shopData, config)

  console.log(response.data) //
  return response.data
}

// Get shops
const getShops = async (token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete shop
const deleteShop = async (shopId, token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  const response = await axios.delete(API_URL + shopId, config)

  return response.data
}

const shopService = {
  createShop,
  getShops,
  deleteShop
}

export default shopService
