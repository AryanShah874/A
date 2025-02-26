export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface RootState {
  products: ProductsState;
  cart: CartState;
}

export interface ProductsState {
  items: Product[];
  categories: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  activeCategory: string | null;
  sortBy: string | null;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}