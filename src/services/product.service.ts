import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductCreateData {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

interface ProductUpdateData extends Partial<ProductCreateData> {}

interface ProductListParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface ProductListResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const productService = {
  async getProducts(params: ProductListParams = {}): Promise<ProductListResponse> {
    return apiService.get<ProductListResponse>(API_ENDPOINTS.PRODUCTS.LIST, { params });
  },

  async getProduct(id: string): Promise<Product> {
    return apiService.get<Product>(API_ENDPOINTS.PRODUCTS.DETAIL(id));
  },

  async createProduct(data: ProductCreateData): Promise<Product> {
    return apiService.post<Product>(API_ENDPOINTS.PRODUCTS.CREATE, data);
  },

  async updateProduct(id: string, data: ProductUpdateData): Promise<Product> {
    return apiService.put<Product>(API_ENDPOINTS.PRODUCTS.UPDATE(id), data);
  },

  async deleteProduct(id: string): Promise<void> {
    return apiService.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
  },
}; 