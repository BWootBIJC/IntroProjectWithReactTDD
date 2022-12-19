import {ErrorResponseDTO} from "../dtos/ErrorResponseDTO";

export const apiResponseHandler = async (response) => {
    if (response.ok) {
        return response.json()
    } return await response.json()
        .then(rej => {
            return Promise.reject(new ErrorResponseDTO(rej.message, rej.validationErrors));
        });
}