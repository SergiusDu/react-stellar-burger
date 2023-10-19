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

export function setCookie(cname, cvalue, maxAge) {
    document.cookie = `${cname}=${cvalue}; max-age=${maxAge};`
}

export default fetchAPI;
