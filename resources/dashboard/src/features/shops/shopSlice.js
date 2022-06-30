import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import shopService from './shopService'

const initialState = {
  shops: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

// Create shop
export const createShop = createAsyncThunk('shops/create', async (shopData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await shopService.createShop(shopData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


// Get shops
/* export const getShops = createAsyncThunk('shops/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await shopService.getShops(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}) */
// Get PAGED Shops
export const getPagedShops = createAsyncThunk('shops/getPaged', async (page, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await shopService.getPagedShops(token, page)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


// Delete shop
export const deleteShop = createAsyncThunk('shops/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await shopService.deleteShop(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// the Actual slice function
export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
    .addCase(createShop.pending, (state) => {
      state.isLoading = true
    })
    .addCase(createShop.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      // state.shops.push(action.payload)  // need to make sure if this is required, ad shops is unlikely to survive form exit
    })
    .addCase(createShop.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })

    /* .addCase(getShops.pending, (state) => {
        state.isLoading = true
    })
    .addCase(getShops.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.shops = action.payload
    })
    .addCase(getShops.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    }) */

    .addCase(getPagedShops.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getPagedShops.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.shops = action.payload
    })
    .addCase(getPagedShops.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })

    .addCase(deleteShop.pending, (state) => {
        state.isLoading = true
    })
    .addCase(deleteShop.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.shops = state.shops.filter((shop) => shop._id !== action.payload.id)
    })
    .addCase(deleteShop.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
  }
})

export const {reset, gotShops} = shopSlice.actions
export default shopSlice.reducer
