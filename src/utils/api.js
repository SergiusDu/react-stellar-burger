async function fetchAPI(url, method = 'GET', bodyData = null, headers = {}) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        };

        if (bodyData) {
            options.body = JSON.stringify(bodyData);
        }

        const response = await fetch(url, options);

        if (response.ok) {
            const data = await response.json();
            return data.data || data;
        } else {
            console.error(`Ошибка, ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default fetchAPI;
