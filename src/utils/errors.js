class ApiError extends Error {
  constructor(response) {
    super();

    this.name = 'APIError';
    this.response = response;
    this.message = 'An error occurred';
  }

  get status() {
    return this.response.status;
  }
}

export { ApiError };
