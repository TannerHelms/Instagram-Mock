import { createContext } from "react";
import { store } from "../redux/store";

export class Api {
  async makeRequest(url, method, body) {
    const token = store.getState().token.value;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Check if the body is an instance of FormData. If not, set the Content-Type to application/json
    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(body);
    }

    const options = {
      method,
      headers,
      body: method !== 'GET' ? body : null,
    };

    if (method === 'GET') delete options.body; // Remove body for GET requests

    const res = await fetch(url, options);

    const resp = await res.json();
    if (resp.error) throw new Error(resp.error);
    return resp;
  }

  get(url) {
    return this.makeRequest(url, 'GET');
  }

  post(url, body = {}) {
    return this.makeRequest(url, 'POST', body);
  }

  put(url, body = {}) {
    return this.makeRequest(url, 'PUT', body);
  }

  del(url) {
    return this.makeRequest(url, 'DELETE');
  }
}

export const ApiContext = createContext(new Api());