export type HttpMethodType =
  | 'GET'
  | 'POST'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD';
export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
  HEAD: 'HEAD',
} as Record<HttpMethodType, HttpMethodType>;

export const HttpMutationMethods: HttpMethodType[] = [
  HttpMethod.DELETE,
  HttpMethod.POST,
  HttpMethod.PATCH,
];

export const ERROR_CODE = {
  CSRF_CHECK_FAILED: 403001,
  GOOGLE_UNVERIFIED_EMAIL: 403002,
  GOOGLE_VERIFICATION_FAILED: 403003,
} as const;
