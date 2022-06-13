import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import shopService from './shopService'

// Get user from local storage
// const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  // shop: null,
  shops: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

// Create shop
export const createShop = createAsyncThunk('shops/create', async (shopData, thunkAPI) => {
  try {
      return await shopService.createShop(shopData)
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

// // Get shops
// export const getUsers = createAsyncThunk('shops/getAll', async (_, thunkAPI) => {
//   try {
//       // const token = thunkAPI.getState().auth.shop.token
//       // return await shopService.getUsers(token)
//   } catch (error) {
//       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//       return thunkAPI.rejectWithValue(message)
//   }
// })

// // Delete shop
// export const deleteUser = createAsyncThunk('shops/delete', async (id, thunkAPI) => {
//   try {
//       // const token = thunkAPI.getState().auth.shop.token
//       // return await shopService.deleteUser(id, token)
//   } catch (error) {
//       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//       return thunkAPI.rejectWithValue(message)
//   }
// })

// the Actual slice function
export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
      reset: (state) => {
          // state.shop = null
          state.shops = []
          state.isLoading = false
          state.isSuccess = false
          state.isError = false
          state.message = ''
      }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createShop.pending, (state) => {
        state.isLoading = true
    })
    .addCase(createShop.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.shops.push(action.payload)
    })
    .addCase(createShop.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
    // .addCase(getUsers.pending, (state) => {
    //     state.isLoading = true
    // })
    // .addCase(getUsers.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.isSuccess = true
    //     state.goals = action.payload
    // })
    // .addCase(getUsers.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.isError = true
    //     state.message = action.payload
    // })
    // .addCase(deleteUser.pending, (state) => {
    //     state.isLoading = true
    // })
    // .addCase(deleteUser.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.isSuccess = true
    //     state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
    // })
    // .addCase(deleteUser.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.isError = true
    //     state.message = action.payload
    // })
  }
})

export const {reset} = shopSlice.actions
export default shopSlice.reducer
