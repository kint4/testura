import { APIRequestContext, APIResponse } from 'playwright';

export interface UserPayload {
  name: string;
  email: string;
  password: string;
  title: string;
  birth_date: string;
  birth_month: string;
  birth_year: string;
  firstname: string;
  lastname: string;
  company?: string;
  address1: string;
  address2?: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobile_number: string;
}

export class AccountClient {
  constructor(private readonly request: APIRequestContext) {}

  async createAccount(userData: UserPayload): Promise<APIResponse> {
    return this.request.post('/api/createAccount', {
      form: userData as unknown as Record<string, string>,
    });
  }

  async updateAccount(userData: UserPayload): Promise<APIResponse> {
    return this.request.put('/api/updateAccount', {
      form: userData as unknown as Record<string, string>,
    });
  }

  async deleteAccount(params: { email: string; password: string }): Promise<APIResponse> {
    return this.request.delete('/api/deleteAccount', {
      form: params,
    });
  }

  async getUserByEmail(email: string): Promise<APIResponse> {
    return this.request.get('/api/getUserDetailByEmail', {
      params: { email },
    });
  }
}
