export const PHOTOS_READ_ONLY =
  "https://www.googleapis.com/auth/photoslibrary.readonly";

export const ALBUMS = ["Bolt"];

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  NOT_FOUND = 404,

  INTERNAL_SERVER_ERROR = 500,
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}
