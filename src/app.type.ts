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
  VALIDATION_ERROR: 400001,
  CSRF_CHECK_FAILED: 403001,
  GOOGLE_UNVERIFIED_EMAIL: 403002,
  GOOGLE_VERIFICATION_FAILED: 403003,
  INVALID_GOOGLE_ID_TOKEN: 403004,
  MENU_GROUP_NOT_FOUND: 404001,
  MENU_ITEM_NOT_FOUND: 404002,
} as const;
