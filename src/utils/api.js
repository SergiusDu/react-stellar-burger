async function fetchAPI(url, method, bodyData = null, headers = {}) {
  const options = {
    method, headers: {
      'Content-Type': 'application/json', ...headers,
    },
  };
  if (bodyData) {
    options.body = JSON.stringify(bodyData);
  }
  const response = await fetch(url, options);
  const data = await response.json();
  return data.data || data;
}

export function setCookie(cookieName, cookieValue, maxAge) {
  document.cookie = `${cookieName}=${cookieValue}; max-age=${maxAge};`
}

export function getCookieByName(cookieName) {
  const allCookies = document.cookie.split('; ');
  for (const cookieString of allCookies) {
    const [name, value] = cookieString.split('=');
    if (name === cookieName) {
      return value;
    }
  }
  return null;
}

export function deleteCookie(cookieName) {
  document.cookie = `${cookieName}=; max-age=0; path=/`;
}

export function checkAuthToken() {
  return !!getCookieByName('accessToken');
}

export default fetchAPI;