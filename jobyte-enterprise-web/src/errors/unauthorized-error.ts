import { HttpError } from "./http-error";

export class UnauthorizedError extends HttpError {
  constructor(body?: unknown) {
    super(401, body, "Não autorizado!");
  }
}