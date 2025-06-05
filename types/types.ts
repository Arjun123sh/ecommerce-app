export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image_uri: string;
  ar_uri?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  name?: string | null;
  phone?: string;
  image?: string | null;
}

export interface AuthContextType {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  login: (email: string, password: string) => Promise<{ success: boolean; msg?: string }>;
  register: (
    email: string,
    password: string,
    name: string,
    phone: string
  ) => Promise<{ success: boolean; msg?: string }>;
  updateUserData: (uid: string) => Promise<void>;
}
