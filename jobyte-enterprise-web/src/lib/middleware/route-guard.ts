import { NextRequest, NextResponse } from "next/server";
import { 
  MiddlewareConfig, 
  AuthState, 
  RouteAnalysis, 
  MiddlewareAction,
  AUTH_COOKIES 
} from "./types";

/**
 * RouteGuard - Classe responsável pelo gerenciamento de rotas
 * 
 * Implementa o padrão Strategy para processamento de diferentes tipos de rotas.
 * Segue os princípios SOLID:
 * - S: Responsabilidade única (gerenciar acesso às rotas)
 * - O: Aberto para extensão (novos tipos de rota podem ser adicionados)
 * - L: Substituição de Liskov (pode ser estendida)
 * - I: Segregação de interfaces (tipos bem definidos)
 * - D: Inversão de dependência (depende de abstrações via config)
 */
export class RouteGuard {
  private readonly request: NextRequest;
  private readonly config: MiddlewareConfig;
  private readonly authState: AuthState;
  private readonly routeAnalysis: RouteAnalysis;

  constructor(request: NextRequest, config: MiddlewareConfig) {
    this.request = request;
    this.config = config;
    this.authState = this.getAuthState();
    this.routeAnalysis = this.analyzeRoute();
  }

  /**
   * Processa a requisição e retorna a resposta apropriada
   */
  public process(): NextResponse {
    const action = this.determineAction();
    return this.executeAction(action);
  }

  /**
   * Obtém o estado de autenticação do usuário
   */
  private getAuthState(): AuthState {
    const accessToken = this.request.cookies.get(AUTH_COOKIES.ACCESS_TOKEN)?.value;
    const refreshToken = this.request.cookies.get(AUTH_COOKIES.REFRESH_TOKEN)?.value;

    return {
      hasAccessToken: Boolean(accessToken),
      hasRefreshToken: Boolean(refreshToken),
      isAuthenticated: Boolean(accessToken || refreshToken),
    };
  }

  /**
   * Analisa a rota atual e retorna suas características
   */
  private analyzeRoute(): RouteAnalysis {
    const pathname = this.request.nextUrl.pathname;

    return {
      pathname,
      isPrivate: this.matchesPath(pathname, this.config.privatePaths),
      isAuth: this.matchesPath(pathname, this.config.authPaths),
      isPublic: this.matchesPath(pathname, this.config.publicPaths),
      isIgnored: this.matchesPath(pathname, this.config.ignoredPaths),
      isRoot: pathname === "/",
      isApi: pathname.startsWith("/api"),
    };
  }

  /**
   * Verifica se o pathname corresponde a algum dos paths configurados
   * Suporta matching exato e por prefixo
   */
  private matchesPath(pathname: string, paths: string[]): boolean {
    return paths.some((path) => {
      // Matching exato
      if (pathname === path) return true;
      
      // Matching por prefixo (para rotas aninhadas como /dashboard/settings)
      if (pathname.startsWith(`${path}/`)) return true;
      
      // Matching por prefixo simples (para /api, /_next, etc)
      if (pathname.startsWith(path)) return true;
      
      return false;
    });
  }

  /**
   * Determina a ação a ser tomada com base na análise da rota e estado de auth
   */
  private determineAction(): MiddlewareAction {
    const { routeAnalysis, authState, config } = this;

    // 1. Rotas ignoradas - sempre passar
    if (routeAnalysis.isIgnored) {
      return { type: "next" };
    }

    // 2. Rotas de API - sempre passar
    if (routeAnalysis.isApi) {
      return { type: "next" };
    }

    // 3. Rota raiz - redirecionar para home
    if (routeAnalysis.isRoot) {
      return { type: "redirect", url: config.redirects.root };
    }

    // 4. Rotas públicas - sempre passar
    if (routeAnalysis.isPublic) {
      return { type: "next" };
    }

    // 5. Rotas de autenticação - redirecionar se já autenticado
    if (routeAnalysis.isAuth) {
      if (authState.isAuthenticated) {
        return { type: "redirect", url: config.redirects.authenticated };
      }
      return { type: "next" };
    }

    // 6. Rotas privadas - redirecionar se não autenticado
    if (routeAnalysis.isPrivate) {
      if (!authState.isAuthenticated) {
        return { type: "redirect", url: config.redirects.unauthenticated };
      }
      return { type: "next" };
    }

    // 7. Rotas não mapeadas - passar (permite novas rotas funcionarem)
    return { type: "next" };
  }

  /**
   * Executa a ação determinada
   */
  private executeAction(action: MiddlewareAction): NextResponse {
    switch (action.type) {
      case "redirect":
        return this.redirect(action.url);
      case "next":
      default:
        return this.next();
    }
  }

  /**
   * Cria uma resposta de redirecionamento
   */
  private redirect(url: string): NextResponse {
    const redirectUrl = new URL(url, this.request.url);
    
    // Adiciona a URL de retorno para rotas privadas
    if (this.routeAnalysis.isPrivate && !this.authState.isAuthenticated) {
      redirectUrl.searchParams.set("callbackUrl", this.routeAnalysis.pathname);
    }

    return NextResponse.redirect(redirectUrl);
  }

  /**
   * Cria uma resposta para continuar o processamento
   */
  private next(): NextResponse {
    const response = NextResponse.next();
    
    // Headers de debug (apenas em desenvolvimento)
    if (process.env.NODE_ENV === "development") {
      response.headers.set("x-route-type", this.getRouteType());
      response.headers.set("x-auth-status", this.authState.isAuthenticated ? "authenticated" : "anonymous");
    }

    return response;
  }

  /**
   * Retorna o tipo da rota para debug
   */
  private getRouteType(): string {
    const { routeAnalysis } = this;
    
    if (routeAnalysis.isIgnored) return "ignored";
    if (routeAnalysis.isApi) return "api";
    if (routeAnalysis.isPublic) return "public";
    if (routeAnalysis.isAuth) return "auth";
    if (routeAnalysis.isPrivate) return "private";
    
    return "unmapped";
  }
}
