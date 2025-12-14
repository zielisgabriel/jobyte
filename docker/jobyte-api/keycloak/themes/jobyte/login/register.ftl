<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('email','username','password','password-confirm') displayInfo=false; section>
    <#if section = "form">
        <div class="login-card-header">
            <h2 class="login-card-title">Criar conta</h2>
            <p class="login-card-description">Preencha os dados para cadastrar sua empresa</p>
        </div>
        
        <#if messagesPerField.existsError('email','username','password','password-confirm')>
            <div class="alert-error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>
                    <#if messagesPerField.existsError('email')>
                        ${kcSanitize(messagesPerField.get('email'))?no_esc}
                    <#elseif messagesPerField.existsError('username')>
                        ${kcSanitize(messagesPerField.get('username'))?no_esc}
                    <#elseif messagesPerField.existsError('password')>
                        ${kcSanitize(messagesPerField.get('password'))?no_esc}
                    <#elseif messagesPerField.existsError('password-confirm')>
                        ${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}
                    </#if>
                </span>
            </div>
        </#if>
        
        <form id="kc-register-form" action="${url.registrationAction}" method="post">
            <div class="form-group">
                <label for="email" class="form-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    E-mail
                </label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    class="form-input <#if messagesPerField.existsError('email')>error</#if>"
                    placeholder="seu@email.com"
                    value="${(register.formData.email!'')}"
                    autocomplete="email"
                    autofocus
                />
            </div>
            
            <input type="hidden" id="username" name="username" value="${(register.formData.email!'')}"/>
            
            <div class="form-group">
                <label for="password" class="form-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    Senha
                </label>
                <div class="password-wrapper">
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        class="form-input <#if messagesPerField.existsError('password')>error</#if>"
                        placeholder="••••••••"
                        autocomplete="new-password"
                    />
                    <button type="button" class="password-toggle" onclick="togglePassword('password', 'eye-icon-password')">
                        <svg id="eye-icon-password" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="form-group">
                <label for="password-confirm" class="form-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                        <path d="m9 12 2 2 4-4"/>
                    </svg>
                    Confirmar senha
                </label>
                <div class="password-wrapper">
                    <input 
                        type="password" 
                        id="password-confirm" 
                        name="password-confirm" 
                        class="form-input <#if messagesPerField.existsError('password-confirm')>error</#if>"
                        placeholder="••••••••"
                        autocomplete="new-password"
                    />
                    <button type="button" class="password-toggle" onclick="togglePassword('password-confirm', 'eye-icon-confirm')">
                        <svg id="eye-icon-confirm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <button type="submit" class="btn-submit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <line x1="19" y1="8" x2="19" y2="14"/>
                    <line x1="22" y1="11" x2="16" y2="11"/>
                </svg>
                Criar conta
            </button>
        </form>
        
        <#if realm.password && social.providers??>
            <div class="divider">
                <span>ou cadastre-se com</span>
            </div>
            
            <#list social.providers as p>
                <a href="${p.loginUrl}" class="btn-social">
                    <#if p.alias == "google">
                        <svg viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                    <#else>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                        </svg>
                    </#if>
                    Continuar com ${p.displayName}
                </a>
            </#list>
        </#if>
        
        <div class="register-section">
            <p>Já tem uma conta?</p>
            <a href="${url.loginUrl}" class="btn-register">Fazer login</a>
        </div>
        
        <script>
            function togglePassword(inputId, iconId) {
                const passwordInput = document.getElementById(inputId);
                const eyeIcon = document.getElementById(iconId);
                
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
                } else {
                    passwordInput.type = 'password';
                    eyeIcon.innerHTML = '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>';
                }
            }
            
            document.getElementById('email').addEventListener('input', function() {
                const usernameField = document.getElementById('username');
                if (usernameField) {
                    usernameField.value = this.value;
                }
            });
        </script>
    </#if>
</@layout.registrationLayout>
