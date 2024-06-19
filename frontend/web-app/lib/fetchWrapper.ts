import { getTokenWorkaround } from "@/app/actions/auctionActions";
import { headers } from "next/headers";

const baseUrl = "http://localhost:6001/"; // URL of the gateway service

async function get(url: string) {
  const requestOptions = {
    method: "GET",
    //headers: {},
  };

  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function post(url: string, body: {}) {
  const requestOptions = {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  };

  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function getHeaders() {
  const token = await getTokenWorkaround();
  const headers = { "Content-Type": "application/json" } as any;
  if (token) {
    headers.Authorization = "Bearer " + token.access_token;
  }
  return headers;
}

async function handleResponse(response: Response) {
  const text = await response.text();
  const data = text && JSON.parse(text);
  if (response.ok) {
    return data || response.statusText;
  } else {
    const error = {
      status: response.status,
      message: response.statusText,
    };

    return error;
  }
}

export const fetchWrapper = {
  get,
};
