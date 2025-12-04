<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${msg("loginTitle",(realm.displayName!''))}</title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
    <link href="${url.resourcesPath}/css/login.css" rel="stylesheet" />
</head>
<body class="login-pf">
    <div class="login-pf-page">
        <div class="login-left-panel">
            <div class="brand">
                <span class="brand-name">Jobyte.</span>
                <span class="brand-suffix">nterprise</span>
            </div>
            
            <div class="hero-content">
                <h1 class="hero-title">Encontre os melhores talentos para sua empresa</h1>
                <p class="hero-description">Gerencie suas vagas, acompanhe candidaturas e construa o time dos seus sonhos.</p>
                
                <div class="features-grid">
                    <div class="feature-card">
                        <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4"/>
                        </svg>
                        <div class="feature-content">
                            <h3>Vagas Ilimitadas</h3>
                            <p>Publique quantas precisar</p>
                        </div>
                    </div>
                    
                    <div class="feature-card">
                        <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        <div class="feature-content">
                            <h3>+10k Candidatos</h3>
                            <p>Base de talentos ativa</p>
                        </div>
                    </div>
                    
                    <div class="feature-card">
                        <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 3v18h18"/>
                            <path d="m19 9-5 5-4-4-3 3"/>
                        </svg>
                        <div class="feature-content">
                            <h3>Analytics</h3>
                            <p>Métricas em tempo real</p>
                        </div>
                    </div>
                    
                    <div class="feature-card">
                        <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4"/>
                        </svg>
                        <div class="feature-content">
                            <h3>Perfil Empresa</h3>
                            <p>Marca empregadora</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                © 2025 Jobyte. Todos os direitos reservados.
            </div>
        </div>
        
        <div class="login-right-panel">
            <#--  <a href="/" class="back-button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m15 18-6-6 6-6"/>
                </svg>
                Voltar
            </a>  -->
            
            <!-- Mobile Brand -->
            <div class="mobile-brand">
                <span class="brand-name" style="color: #fafaf9; font-size: 1.5rem; font-weight: 900;">Jobyte.</span>
                <span class="brand-suffix" style="color: #a8a29e; font-size: 0.875rem; font-weight: 600;">nterprise</span>
            </div>
            
            <div class="login-card">
                <#nested "form">
            </div>
            
            <p class="terms-text">
                Ao entrar, você concorda com nossos 
                <a href="/terms">Termos de Uso</a> e 
                <a href="/privacy">Política de Privacidade</a>
            </p>
        </div>
    </div>
</body>
</html>
</#macro>
