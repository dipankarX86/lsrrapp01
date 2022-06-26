import axios from 'axios'

const API_URL = '/api/addresses'

// Get CSC
const getCsc = async (token) => {
  console.log('ADDRESS_SERVICE')
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }
  const response = await axios.get(API_URL + '/CSC', config)
  return response.data
}

const shopService = {
  getCsc
}

export default shopService
