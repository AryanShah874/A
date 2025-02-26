import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState } from '../../types';

// Async thunks for API calls
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (limit: number = 20) => {
    try{
      const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
      const data = await response.json();
      return data;
    }
    catch(error){
      console.error('Failed to fetch products: ', error);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    try{
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      return data;
    }
    catch(error){
      console.error('Failed to fetch categories: ', error);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category: string) => {
    try{
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const data = await response.json();
      return data;
    }
    catch(error){
      console.error('Failed to fetch products by category: ', error);
    }
  }
);

const initialState: ProductsState = {
  items: [],
  categories: [],
  status: 'idle',
  error: null,
  activeCategory: null,
  sortBy: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<string | null>) => {
      state.activeCategory = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string | null>) => {
      state.sortBy = action.payload;
      if (state.sortBy === 'name-asc') {
        state.items.sort((a, b) => a.title.localeCompare(b.title));
      } else if (state.sortBy === 'name-desc') {
        state.items.sort((a, b) => b.title.localeCompare(a.title));
      } else if (state.sortBy === 'price-asc') {
        state.items.sort((a, b) => a.price - b.price);
      } else if (state.sortBy === 'price-desc') {
        state.items.sort((a, b) => b.price - a.price);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.categories = action.payload;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      });
  },
});

export const { setActiveCategory, setSortBy } = productsSlice.actions;
export default productsSlice.reducer;