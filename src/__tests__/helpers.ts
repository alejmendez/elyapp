import { app } from "../index";

const baseUrl = process.env.APP_URL || 'http://localhost:4000/api/v1/';

let isAppRunning = false;

export function runApp() {
  if (!isAppRunning) {
    app.listen(Number(process.env.APP_PORT || 4000));
    isAppRunning = true;
  }
}

export async function stopApp() {
  if (isAppRunning) {
    await app.stop();
    isAppRunning = false;
  }
}

export const fetchApi = async (url: string, options: RequestInit = {}) => await fetch(baseUrl + url, options);
export const fetchApiPost = async (url: string, body: any, options: RequestInit = {}) => await fetchApi(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
  ...options
});

export const fetchApiPut = async (url: string, body: any, options: RequestInit = {}) => await fetchApi(url, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
  ...options
});

export const fetchApiDelete = async (url: string, options: RequestInit = {}) => await fetchApi(url, {
  method: 'DELETE',
  ...options
});
