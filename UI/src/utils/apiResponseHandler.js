export const apiResponseHandler = async (response) => {
    if (response.ok) {
        return response.json();
    } return await response.json().then(() => {
        return Promise.reject(response)
    });
}