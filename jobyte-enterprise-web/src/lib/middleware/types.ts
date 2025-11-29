/**
 * Tipos e interfaces para o sistema de middleware
 * Seguindo princípios SOLID e Clean Architecture
 */

/**
 * Configuração do middleware
 */
export interface MiddlewareConfig {
  /** Rotas que requerem autenticação */
  privatePaths: string[];
  
  /** Rotas de autenticação (login, register) */
  authPaths: string[];
  
  /** Rotas públicas acessíveis por todos */
  publicPaths: string[];
  
  /** Rotas ignoradas pelo middleware */
  ignoredPaths: string[];
  
  /** Configuração de redirecionamentos */
  redirects: RedirectConfig;
}

/**
 * Configuração de redirecionamentos
 */
export interface RedirectConfig {
  /** Para onde redirecionar usuários não autenticados */
  unauthenticated: string;
  
  /** Para onde redirecionar usuários já autenticados (em páginas de auth) */
  authenticated: string;
  
  /** Redirecionamento da rota raiz */
  root: string;
}

/**
 * Estado de autenticação do usuário
 */
export interface AuthState {
  /** Se o usuário possui access token válido */
  hasAccessToken: boolean;
  
  /** Se o usuário possui refresh token */
  hasRefreshToken: boolean;
  
  /** Se o usuário está autenticado (qualquer token presente) */
  isAuthenticated: boolean;
}

/**
 * Resultado da análise de rota
 */
export interface RouteAnalysis {
  /** Pathname da requisição */
  pathname: string;
  
  /** Se a rota é privada */
  isPrivate: boolean;
  
  /** Se a rota é de autenticação */
  isAuth: boolean;
  
  /** Se a rota é pública */
  isPublic: boolean;
  
  /** Se a rota deve ser ignorada */
  isIgnored: boolean;
  
  /** Se é a rota raiz */
  isRoot: boolean;
  
  /** Se é uma rota de API */
  isApi: boolean;
}

/**
 * Tipo de ação a ser tomada pelo middleware
 */
export type MiddlewareAction = 
  | { type: "next" }
  | { type: "redirect"; url: string };

/**
 * Nomes dos cookies de autenticação
 */
export const AUTH_COOKIES = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

/**
 * Headers customizados para debug
 */
export const DEBUG_HEADERS = {
  ROUTE_TYPE: "x-route-type",
  AUTH_STATUS: "x-auth-status",
} as const;
