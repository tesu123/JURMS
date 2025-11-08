class ApiResponse {
  constructor(statusCode, data, message = "Sucess") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400; // All status code < 400 are successful
  }
}

export { ApiResponse };
