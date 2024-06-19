const baseUrl = "http://localhost:6001/"; // URL of the gateway service

async function get(url: string) {
  const requestOptions = {
    method: "GET",
    //headers: {},
  };

  const response = await fetch(baseUrl + url, requestOptions);
  return handleResponse(response);
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
