export interface Category {
  id: number;
  label: string;
  slug: string;
  parent: number | null;
  description: string;
  image: string | null;
  subcategories: Category[];
}

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
  id: number;
  name: string;
  slug: string;
}

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
}

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku?: string;
  selectedVariants?: Record<string, string>;
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