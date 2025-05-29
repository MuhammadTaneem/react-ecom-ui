export interface Category {
  id: number;
  label: string;
  slug: string;
  parent: number | null;
  description: string;
  image: string | null;
  subcategories: Category[];
}

<<<<<<< HEAD
export interface ProductVariant {
  id: number;
  product: number;
  sku_code: string;
  price: string;
  discount_price: string | null | undefined;
  stock_quantity: number;
  variants_dict: Record<string, string>;
  variants: number[];
}

export interface ProductImage {
  id: number;
  image: string;
}

export interface ProductTag {
=======
export interface Tag {
>>>>>>> bc4149c0046478430cc13ac89fc433e280c466ea
  id: number;
  name: string;
  slug: string;
}

<<<<<<< HEAD
export interface Product {
  id: number;
  name: string;
  slug?: string;
  description?: Record<string, string>;
  short_description?: string;
  price?: number;
  base_price: string;
  discount_price?: string;
  image?: string;
  thumbnail: string;
  category: number | string;
  categoryId?: number;
  inStock?: boolean;
  stock_quantity: number;
  featured?: boolean;
  rating?: number;
  has_variants: boolean;
  key_features: string[];
  additional_info: Record<string, string>;
  brand: number | null;
  tags: ProductTag[];
  images: ProductImage[];
  skus: ProductVariant[];
  average_rating?: number;
  rating_count?: number;
  created_at?: string;
  updated_at?: string;
  is_active?: boolean;
  is_deleted?: boolean;
=======
export interface ProductImage {
  id: number;
  image: string;
}

export interface ProductVariant {
  id: number;
  product: number;
  sku_code: string;
  price: string;
  discount_price: string;
  stock_quantity: number;
  variants_dict: Record<string, string>;
  variants: number[];
}

export interface Product {
  id: number;
  name: string;
  base_price: string;
  stock_quantity: number;
  has_variants: boolean;
  short_description: string;
  discount_price: string;
  category: number;
  key_features: string[];
  description: Record<string, string>;
  additional_info: Record<string, string>;
  thumbnail: string;
  brand: string | null;
  tags: Tag[];
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_deleted: boolean;
  images: ProductImage[];
  skus: ProductVariant[];
  average_rating: number;
  rating_count: number;
>>>>>>> bc4149c0046478430cc13ac89fc433e280c466ea
}

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
<<<<<<< HEAD
  sku?: string;
  selectedVariants?: Record<string, string>;
=======
  selectedVariant?: ProductVariant;
>>>>>>> bc4149c0046478430cc13ac89fc433e280c466ea
}

export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  addresses: Address[];
}

export interface Address {
  id: number;
  name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  area: string;
  phone_number: string;
  is_default: boolean;
}

export type PaymentMethod = 'cash' | 'mobile' | 'card';

export interface PaymentDetails {
  method: PaymentMethod;
  mobile_number?: string;
  transaction_id?: string;
  card_number?: string;
  expiry_date?: string;
  cvv?: string;
}