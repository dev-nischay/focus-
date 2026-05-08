export type ApiResponse<T> = {
  success: true;
  data: T;
  status: httpStatus;
};

export type ApiError = {
  success: false;
  status: httpStatus;
  error: string;
  fieldErrors?: {};
};

export enum httpStatus {
  Ok = 200,
  Created = 201,
  NotFound = 404,
  Unauthorized = 401,
  Conflict = 409,
  BadRequest = 400,
  InternalServerError = 500,
}
