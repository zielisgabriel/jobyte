/**
 * Middleware Module
 * 
 * Exporta todas as funcionalidades do sistema de middleware
 */

export { RouteGuard } from "./route-guard";
export type { 
  MiddlewareConfig, 
  AuthState, 
  RouteAnalysis, 
  MiddlewareAction,
  RedirectConfig 
} from "./types";
export { AUTH_COOKIES, DEBUG_HEADERS } from "./types";
