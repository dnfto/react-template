export const HTTP_STATUS = {
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  serverError: 500,
} as const;

export const IDEMPOTENT_METHODS = ['get', 'head', 'options', 'put', 'delete'] as const;
