import { createContext } from "react";
import { store } from "../redux/store";

export class Api {
  async makeRequest(url, method, body) {
    const token = store.getState().token.value;
    const options = {};
    if (method === 'POST' || method === 'PUT') {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      ...options,
    });

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