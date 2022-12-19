export class ErrorResponseDTO {
    constructor(name, validationErrors) {
        this.name = name;
        this.validationErrors = validationErrors;
    }
    name;
    validationErrors;
}