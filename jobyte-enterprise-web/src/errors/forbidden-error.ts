import { HttpError } from "./http-error";

export class ForbiddenError extends HttpError {
  constructor(body?: unknown) {
    super(403, body, "Proibido!");
  }
}