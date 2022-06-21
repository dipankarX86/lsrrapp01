import axios from 'axios'

const API_URL = '/api'

// Get roles
const getRoles = async (token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  const response = await axios.get( API_URL + '/roles', config)

  return response.data
}

const utilityService = {
  getRoles
}

export default utilityService


// LETS NOT USE IT FROM HERE NOW, WILL USE AXIOS DIRECTLY FROM CONTROLLER USING PROMISE