export class HttpError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details: string = ''
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string, details: string = '') {
    super(message, 404, details);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string, details: string = '') {
    super(message, 401, details);
    this.name = 'UnauthorizedError';
  }
}
