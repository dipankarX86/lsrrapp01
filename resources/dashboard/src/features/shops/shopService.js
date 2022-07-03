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
/* const getShops = async (token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }
  const response = await axios.get(API_URL, config)
  console.log(response.data)
  return response.data
} */
// 
// Get Paged shops
const getPagedShops = async (token, loadParams) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  // API_URL+'?page='+loadParams.scrhPage+'?srch_string='+loadParams.srchString+'?sort_by='+loadParams.srchSort
  let urlString = API_URL+'?page='+loadParams.scrhPage
  // 
  if(loadParams.srchString.length > 0) {
    urlString = urlString + '&srch_string='+loadParams.srchString
  }
  if(loadParams.srchSort.length > 0) {
    urlString = urlString + '&sort_by='+loadParams.srchSort
  }

  console.log(urlString)

  const response = await axios.get(urlString, config)

  console.log(response.data)
  return response.data
}

// 
// Get shops
const getShop = async (token, shopId) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }
  const response = await axios.get(API_URL + '/' + shopId, config)
  console.log(response.data.shop)
  return response.data.shop
}
// 

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
  getPagedShops,  // getShops is removed
  getShop,
  deleteShop
}

export default shopService
