import { HttpError } from "./http-error";

export class NotFoundError extends HttpError {
  constructor(body?: unknown) {
    super(404, body, "Não encontrado!");
  }
}