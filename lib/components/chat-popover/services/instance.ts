import type { Config } from '../../../Chat';

const BASE_URL = 'https://api.enhancedocs.com';

export async function Get (route: string, config: Config, options?: any) {
  const baseURL = config.apiBaseURL || BASE_URL;
  if (options?.stream) {
    return fetch(`${baseURL}${route}`, options);
  }
  return fetch(`${baseURL}${route}`, options).then((response) => response.json());
}

export async function Post (route: string, config: Config, options?: any) {
  const baseURL = config.apiBaseURL || BASE_URL;
  if (options?.stream) {
    return fetch(`${baseURL}${route}`, { method: 'POST', ...options });
  }
  return fetch(`${baseURL}${route}`, { method: 'POST', ...options }).then((response) => response.json());
}
