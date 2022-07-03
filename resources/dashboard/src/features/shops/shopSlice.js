import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import shopService from './shopService'

const initialState = {
  shops: [],
  shopsLoadTried: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  
  shop: null,
  shopApiCallCount: 0,

  // renderPending: false
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
export const getPagedShops = createAsyncThunk('shops/getPaged', async (loadParams, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await shopService.getPagedShops(token, loadParams)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get Shop
export const getShop = createAsyncThunk('shops/getOne', async (shopId, thunkAPI) => {
  console.log(shopId)
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await shopService.getShop(token, shopId)
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
    
    resetShops: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    stopShopsTry: (state) => {
      state.shopsLoadTried++
    },

    gotShop: (state) => {
      state.shopsLoadTried++
    },
    resetExceptShop: (state) => {
      state.shops = []
      state.shopsLoadTried = 0
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    
    /* toggleAddressRender: (state) => {
      state.renderPending = !state.renderPending
    }, */
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


    // .addCase(getShop.pending, (state) => {
    //   state.isLoading = true
    // })
    .addCase(getShop.fulfilled, (state, action) => {
        // state.isLoading = false
        // state.isSuccess = true
        state.shop = action.payload
    })
    // .addCase(getShop.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.isError = true
    //     state.message = action.payload
    // })

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

export const {reset, resetShops, stopShopsTry, gotShop, resetExceptShop} = shopSlice.actions  // add toggleAddressRender if required
export default shopSlice.reducer
