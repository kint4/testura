import { APIRequestContext, APIResponse } from 'playwright';

export class ProductClient {
  constructor(private readonly request: APIRequestContext) {}

  async getAllProducts(): Promise<APIResponse> {
    return this.request.get('/api/productsList');
  }

  async postProductsList(): Promise<APIResponse> {
    return this.request.post('/api/productsList');
  }

  async getAllBrands(): Promise<APIResponse> {
    return this.request.get('/api/brandsList');
  }

  async putBrandsList(): Promise<APIResponse> {
    return this.request.put('/api/brandsList');
  }

  async searchProduct(keyword: string): Promise<APIResponse> {
    return this.request.post('/api/searchProduct', {
      form: { search_product: keyword },
    });
  }

  async searchProductWithoutKeyword(): Promise<APIResponse> {
    return this.request.post('/api/searchProduct', {
      form: {},
    });
  }
}
