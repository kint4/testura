import { APIRequestContext, APIResponse } from 'playwright';

export class AuthClient {
  constructor(private readonly request: APIRequestContext) {}

  async verifyLogin(params: { email: string; password: string }): Promise<APIResponse> {
    return this.request.post('/api/verifyLogin', {
      form: params,
    });
  }

  async verifyLoginMissingEmail(password: string): Promise<APIResponse> {
    return this.request.post('/api/verifyLogin', {
      form: { password },
    });
  }

  async verifyLoginMissingPassword(email: string): Promise<APIResponse> {
    return this.request.post('/api/verifyLogin', {
      form: { email },
    });
  }

  async verifyLoginEmptyBody(): Promise<APIResponse> {
    return this.request.post('/api/verifyLogin', {
      form: {},
    });
  }
}
