import { VacanciesResponse } from "@/types/VacanciesResponse";

export const vacanciesMocks: VacanciesResponse = {
  vacancies: [
    {
      id: "1",
      title: "Desenvolvedor Front-end React",
      company: "TechNova",
      location: "São Paulo, SP (Híbrido)",
      description: `Responsável por construir interfaces escaláveis e acessíveis em React com TypeScript e TailwindCSS, priorizando performance e UX. 
Colaborará com designers e backend para definir contratos de API, estados de carregamento e estratégias de cache. 
Irá manter um design system modular, escrever testes (unitários/e2e) e monitorar métricas de front-end (CLS, LCP, TTI). 
Participará de code reviews, adoção de feature flags, análise de bundle e otimização de renderização. 
Diferenciais: SSR/Next.js, acessibilidade (WCAG/ARIA), PWAs, GraphQL e rastreamento de erros (Sentry).`
    },
    {
      id: "2",
      title: "Engenheiro de Dados",
      company: "DataWave",
      location: "Remoto",
      description: `Desenhará e operará pipelines de dados resilientes em cloud (AWS/GCP), com orquestração e observabilidade ponta a ponta. 
Atuará em ingestão batch/streaming, modelagem dimensional, particionamento e otimização de custos e performance. 
Irá garantir qualidade com testes de dados, contratos, documentação e versionamento de esquemas. 
Trabalhará com Python/SQL, lakes e warehouses modernos, definindo SLAs e governança. 
Diferenciais: Spark/Dataproc/EMR, Airflow/Prefect, DBT, Kafka e práticas de DataOps/MLOps.`
    },
    {
      id: "3",
      title: "Backend Java (Spring Boot)",
      company: "Innova Solutions",
      location: "Curitiba, PR (Presencial)",
      description: `Construirá APIs REST robustas e escaláveis com Spring Boot, incluindo segurança, observabilidade e documentação. 
Modelará domínios, persistência com JPA, transações e integração com mensageria (Kafka/RabbitMQ). 
Aplicará testes (unitários/integração/contract), profilará gargalos e implementará padrões de resiliência. 
Cuidará de versionamento de esquemas, migrações e estratégias idempotentes. 
Diferenciais: Spring Cloud, OpenAPI, Circuit Breaker, OAuth2/OIDC e métricas com Micrometer/Prometheus.`
    },
    {
      id: "4",
      title: "UX/UI Designer Pleno",
      company: "PixelCraft",
      location: "Remoto",
      description: `Irá conduzir discovery, criar fluxos e protótipos de alta fidelidade com foco em usabilidade e métricas de produto. 
Colaborará com times técnicos para garantir handoff eficiente, estados responsivos e acessibilidade. 
Definirá e escalará design systems, tokens e componentes reutilizáveis. 
Mapeará jornadas, hipóteses, experimentos e validará soluções com pesquisa qualitativa/quantitativa. 
Diferenciais: Figma avançado, analytics orientado a decisões, testes de usabilidade e conteúdo UX.`
    },
    {
      id: "5",
      title: "Analista de QA Automatizado",
      company: "QualityLabs",
      location: "Porto Alegre, RS (Híbrido)",
      description: `Desenhará estratégias de testes automatizados ponta a ponta (UI, API e integração), cobrindo cenários críticos. 
Construirá pipelines de qualidade, relatórios de cobertura e detecção precoce de regressões. 
Trabalhará com ambientes de teste estáveis, mocks, dados sintéticos e paralelismo. 
Participará de definição de critérios de aceitação e cultura de qualidade contínua. 
Diferenciais: Cypress/Playwright, TDD/ATDD, testes de contrato, containers e rastreabilidade de casos.`
    },
    {
      id: "6",
      title: "DevOps Engineer",
      company: "CloudEdge",
      location: "Remoto",
      description: `Irá padronizar infraestrutura como código (Terraform) e pipelines CI/CD confiáveis, com segurança e observabilidade. 
Montará estratégias de deploy (blue/green, canary), gestão de segredos e rollback seguro. 
Implementará monitoramento, logs centralizados e alertas orientados a SLOs. 
Otimizará custos em cloud pública com métricas, tags e automações. 
Diferenciais: GitHub Actions, Kubernetes, políticas OPA, FinOps e práticas de segurança em supply chain.`
    },
    {
      id: "7",
      title: "Mobile Developer (Flutter)",
      company: "AppForge",
      location: "Belo Horizonte, MG (Presencial)",
      description: `Desenvolverá apps Flutter com foco em performance, acessibilidade e experiência nativa. 
Criará arquiteturas reativas, gerenciamento de estado, navegação e camadas de dados desacopladas. 
Integrações com APIs REST/GraphQL, push notifications, deep links e analytics. 
Publicará e manterá apps nas stores, versionamento, feature flags e testes automatizados. 
Diferenciais: Flutter Web/Desktop, CI/CD mobile, integração nativa (Android/iOS) e perf tooling.`
    },
    {
      id: "8",
      title: "Product Owner",
      company: "RoadmapX",
      location: "São Paulo, SP (Híbrido)",
      description: `Conduzirá a visão do produto, priorizando backlog por valor e alinhando stakeholders. 
Definirá objetivos, outcomes e métricas, transformando descobertas em entregas incrementais. 
Irá refinar histórias, critérios de aceitação e hipóteses de experimentação. 
Facilitará cerimônias, comunicação clara e gestão de dependências. 
Diferenciais: métricas de produto, discovery contínuo, OKRs e prática forte de storytelling.`
    },
    {
      id: "9",
      title: "Cyber Security Analyst",
      company: "SecureCore",
      location: "Remoto",
      description: `Monitorará vulnerabilidades, configurará detecções e responderá a incidentes com playbooks consolidados. 
Analisará logs, correlações e postura de segurança em Linux/Cloud, reforçando controles de acesso. 
Realizará hardening, gestão de patches e orientação a times de engenharia. 
Manterá relatórios, indicadores de risco e conformidade com boas práticas. 
Diferenciais: SIEM, EDR, threat modeling, IAM, segurança de containers e automações de resposta.`
    },
    {
      id: "10",
      title: "Data Scientist Júnior",
      company: "InsightAI",
      location: "Rio de Janeiro, RJ (Híbrido)",
      description: `Apoiará exploração de dados, limpeza, feature engineering e experimentação com modelos supervisionados. 
Construirá protótipos, avaliará métricas de negócio e comunicará insights de forma objetiva. 
Colaborará com engenharia para transformar MVPs em pipelines reprodutíveis. 
Documentará datasets, premissas e limitações dos modelos. 
Diferenciais: Python, notebooks versionados, MLFlow, métricas de classificação/regressão e ética em IA.`
    },
    {
      id: "11",
      title: "Desenvolvedor Full Stack Node/React",
      company: "StackWorks",
      location: "Remoto",
      description: `Atuará no desenvolvimento de APIs Node.js (Express/Nest) e front-end em React com TypeScript, focando performance e segurança. 
Projetará contratos, paginará dados, aplicará cache e protegerá endpoints conforme OWASP. 
Implementará testes, logs estruturados e métricas, além de CI/CD eficiente. 
Colaborará na definição de arquitetura, versionamento e boas práticas de revisão. 
Diferenciais: SSR/Next.js, Prisma/TypeORM, Redis, GraphQL e feature flags.`
    },
    {
      id: "12",
      title: "Especialista em Observabilidade",
      company: "MonitorPlus",
      location: "São Paulo, SP (Híbrido)",
      description: `Implantará e otimizará stack de observabilidade (métricas, logs, traces) para serviços distribuídos. 
Definirá padrões de instrumentação, amostragem e correlação entre camadas. 
Criará dashboards acionáveis, alertas úteis e SLOs que guiem decisões. 
Treinará times em práticas de análise e resposta a incidentes. 
Diferenciais: Prometheus, Grafana, OpenTelemetry, Loki, e detecção de anomalias.`
    },
    {
      id: "13",
      title: "Arquiteto de Soluções Cloud",
      company: "CloudBridge",
      location: "Brasília, DF (Presencial)",
      description: `Desenhará arquiteturas escaláveis, seguras e custo-efetivas em ambientes multi-cloud. 
Definirá padrões de rede, identidade, observabilidade e automação desde o início. 
Apoiará times no desenho de serviços, catálogos e governança. 
Estabelecerá práticas de FinOps, segurança e compliance. 
Diferenciais: arquiteturas event-driven, zero-trust, IaC e referências de well-architected framework.`
    },
    {
      id: "14",
      title: "Analista de Suporte Técnico N2",
      company: "HelpDeskPro",
      location: "Remoto",
      description: `Realizará diagnóstico avançado, investigação de logs e troubleshooting de integrações complexas. 
Irá reproduzir cenários, documentar causas raiz e propor melhorias permanentes. 
Trabalhará com SLAs, escalonamento eficiente e comunicação clara com clientes e engenharia. 
Automatizará verificações recorrentes e criará base de conhecimento. 
Diferenciais: ferramentas de observabilidade, SQL para triagem e mindset de produto.`
    },
    {
      id: "15",
      title: "Desenvolvedor Python Backend",
      company: "PyEngine",
      location: "Recife, PE (Híbrido)",
      description: `Construirá serviços e APIs com FastAPI/Django REST, preocupando-se com performance e segurança. 
Aplicará boas práticas de versionamento, autenticação, caching e rate limiting. 
Escreverá testes, lidará com filas, jobs assíncronos e observabilidade. 
Otimizará queries SQL e garantirá idempotência em fluxos críticos. 
Diferenciais: Celery/RQ, SQLAlchemy, Pydantic, OpenAPI e CI/CD.`
    },
    {
      id: "16",
      title: "Engenheiro de IA Generativa",
      company: "GenAI Labs",
      location: "Remoto",
      description: `Projetará pipelines de LLMs, prompt engineering, avaliação e segurança de respostas. 
Trabalhará com embeddings, RAG, vetorização e controle de contexto. 
Definirá métricas de qualidade, guardrails e monitoramento de deriva. 
Colaborará com produto para mapear casos de uso e impacto. 
Diferenciais: fine-tuning, avaliação humana, cache semântico, tracing e custo/latência otimizados.`
    },
    {
      id: "17",
      title: "Administrador de Banco de Dados",
      company: "DataShield",
      location: "Porto Alegre, RS (Presencial)",
      description: `Administrará PostgreSQL/MySQL, realizando tuning, índices, particionamento e replicação. 
Definirá políticas de backup/restore, alta disponibilidade e segurança de acesso. 
Monitorará métricas, resolverá gargalos e apoiará desenvolvedores em consultas eficientes. 
Documentará padrões, rotinas e automações. 
Diferenciais: HA/DR, pgbouncer, logical replication, planos de execução e auditoria.`
    },
    {
      id: "18",
      title: "Engenheiro de Testes de Performance",
      company: "LoadMaster",
      location: "Remoto",
      description: `Planejará e executará testes de carga, estresse e endurance para sistemas críticos. 
Analisará métricas de latência, throughput, erros e saturação para identificar gargalos. 
Recomendará otimizações de arquitetura, escalabilidade e configurações. 
Integrará testes a pipelines e reportará capacidade estimada. 
Diferenciais: JMeter, k6, profiling, tracing distribuído e cenários realistas baseados em tráfego.`
    },
    {
      id: "19",
      title: "Especialista em Segurança Aplicacional",
      company: "SecureApps",
      location: "Curitiba, PR (Híbrido)",
      description: `Conduzirá revisões de código focadas em segurança, implementação de controles e políticas de segredos. 
Operará scanners SAST/DAST/IAST e triagem de vulnerabilidades com priorização por risco. 
Apoiará squads em threat modeling, autenticação/autorização e hardening de dependências. 
Definirá padrões seguros e guias de referência. 
Diferenciais: OAuth2/OIDC, CSP, segurança de APIs, SDLC seguro e supply chain security.`
    },
    {
      id: "20",
      title: "Front-end Vue.js",
      company: "VueCraft",
      location: "Florianópolis, SC (Remoto)",
      description: `Desenvolverá SPAs com Vue 3/Pinia, compondo interfaces performáticas e acessíveis. 
Organizará estados, rotas, cache e comunicação com APIs REST/GraphQL. 
Criará testes, otimizará bundle e acompanhará métricas Web Vitals. 
Participará de code reviews e evolução de design system. 
Diferenciais: SSR/Nuxt, microfrontends, i18n, lazy loading e automação CI/CD.`
    },
    {
      id: "21",
      title: "Scrum Master",
      company: "AgileFlow",
      location: "São Paulo, SP (Híbrido)",
      description: `Facilitará cerimônias, remoção de impedimentos e evolução contínua do fluxo de entrega. 
Apoiará times na adoção de práticas ágeis, métricas de fluxo e melhoria de previsibilidade. 
Promoverá transparência, comunicação e colaboração entre áreas. 
Mapeará despesas de contexto e gargalos, propondo experimentos. 
Diferenciais: CFD, lead time, throughput, coaching e gestão de dependências.`
    },
    {
      id: "22",
      title: "Designer de Produto Senior",
      company: "DesignForge",
      location: "Remoto",
      description: `Liderará iniciativas de pesquisa, prototipação e desenho de soluções orientadas a outcomes. 
Construirá e evoluirá design systems escaláveis em parceria com engenharia. 
Irá medir impacto de UX, propor experimentos e consolidar aprendizados. 
Mentorará designers e elevará a qualidade do craft. 
Diferenciais: estratégia de produto, acessibilidade, conteúdo e analytics aplicado ao design.`
    },
    {
      id: "23",
      title: "Engenheiro de Machine Learning",
      company: "MLHub",
      location: "Campinas, SP (Presencial)",
      description: `Projetará e operará pipelines de ML do treino à produção, com monitoramento de qualidade. 
Trabalhará com versionamento de dados/modelos, features e avaliação contínua. 
Implementará inferência eficiente, escalável e observável. 
Colaborará com times de dados e produto para impacto mensurável. 
Diferenciais: Kubeflow, Spark, Feature Store, MLFlow e drift detection.`
    },
    {
      id: "24",
      title: "Analista de BI",
      company: "InsightBoard",
      location: "Remoto",
      description: `Construirá dashboards de negócio claros e confiáveis, com KPIs bem definidos. 
Modelará dados, garantirá consistência semântica e governança de métricas. 
Irá realizar análises ad-hoc, storytelling com dados e documentação. 
Colaborará com especialistas de domínio para alinhar métricas a objetivos. 
Diferenciais: Power BI/Looker, DBT, camadas semânticas e controle de acesso.`
    },
    {
      id: "25",
      title: "Engenheiro de Infraestrutura Linux",
      company: "SysCore",
      location: "Rio de Janeiro, RJ (Presencial)",
      description: `Administrará servidores Linux com foco em segurança, automação e alta disponibilidade. 
Aplicará hardening, gerenciamento de usuários, políticas e monitoramento proativo. 
Automatizará provisionamento e configuração com IaC e CM. 
Analisará performance, kernel tuning e troubleshooting avançado. 
Diferenciais: Ansible, containers, redes, armazenamento e práticas de backup/restore.`
    },
    {
      id: "26",
      title: "Especialista em API Management",
      company: "GatewayX",
      location: "Remoto",
      description: `Definirá padrões de governança, segurança e observabilidade para o ecossistema de APIs. 
Implementará rate limiting, quotas, autenticação e catálogo de serviços. 
Medirá consumo, qualidade e confiabilidade, orientando priorizações. 
Apoiará squads com documentação e contratos bem definidos. 
Diferenciais: OAuth2, OIDC, API Gateway, monetização e tracers distribuídos.`
    },
    {
      id: "27",
      title: "Desenvolvedor .NET Core",
      company: "DotWave",
      location: "São Paulo, SP (Híbrido)",
      description: `Desenvolverá APIs e serviços assíncronos com .NET 8, focando performance e resiliência. 
Usará EF Core com boas práticas de mapeamento, migrações e tuning de queries. 
Integrará Redis, mensageria e observabilidade padronizada. 
Garantirá testes e documentação clara dos endpoints. 
Diferenciais: minimal APIs, gRPC, Health Checks, OpenAPI e containers.`
    },
    {
      id: "28",
      title: "Especialista em E-commerce (Shopify)",
      company: "CommerceLab",
      location: "Remoto",
      description: `Customizará temas, otimizará conversão e desempenho de lojas em Shopify. 
Criará integrações de pagamento, tracking e catálogos complexos. 
Aplicará boas práticas de SEO técnico e acessibilidade. 
Mensurará funis, executará testes A/B e melhorias contínuas. 
Diferenciais: Liquid, apps custom, headless, CDNs e Core Web Vitals.`
    },
    {
      id: "29",
      title: "Game Developer (Unity)",
      company: "PlayForge",
      location: "Remoto",
      description: `Desenvolverá mecânicas, sistemas e ferramentas internas em Unity com foco em performance. 
Otimizará uso de memória, assets e frame time para mobile/desktop. 
Integrará analytics, IAPs, backends e eventos in-game. 
Construirá pipelines de build, testes e publicação. 
Diferenciais: ECS/DOTS, addressables, profiling avançado e shaders básicos.`
    },
    {
      id: "30",
      title: "Especialista em Data Governance",
      company: "DataPolicy",
      location: "Remoto",
      description: `Estabelecerá políticas de governança, catálogo de dados e classificação de sensibilidade. 
Definirá papéis, responsabilidades e processos de qualidade. 
Implantará controles de acesso, auditoria e conformidade com regulações. 
Medirá confiabilidade e facilitará descoberta de dados. 
Diferenciais: LGPD, lineage, stewardship, glossário e governança distribuída.`
    },
    {
      id: "31",
      title: "Analista de SEO Técnico",
      company: "RankBoost",
      location: "Remoto",
      description: `Conduzirá auditorias técnicas para melhorar crawlability, indexação e performance. 
Trabalhará com sitemaps, estrutura semântica, dados estruturados e internacionalização. 
Monitorará Core Web Vitals e implementará otimizações prioritárias. 
Reportará impacto com métricas e experimentos. 
Diferenciais: SEO para SPAs/SSR, logs de bot, edge caching e automação de checks.`
    },
    {
      id: "32",
      title: "Especialista em Middleware",
      company: "IntegrateX",
      location: "Curitiba, PR (Híbrido)",
      description: `Projetará integrações escaláveis via mensageria e padrões event-driven. 
Garantirá idempotência, ordenação e reprocessamento seguro. 
Definirá contratos, DLQs, monitoração e observabilidade de fluxos. 
Apoiará squads na modelagem de eventos e acoplamento baixo. 
Diferenciais: Kafka, RabbitMQ, schema registry, backpressure e tracing.`
    },
    {
      id: "33",
      title: "Engenheiro SRE",
      company: "ReliabilityLab",
      location: "Remoto",
      description: `Definirá SLIs/SLOs, confiabilidade como prioridade e automação de incidentes. 
Construirá runbooks, reduzirá MTTR e revisará post-mortems sem culpa. 
Criará mecanismos de resiliência, escalabilidade e capacidade planejada. 
Irá instrumentar observabilidade acionável. 
Diferenciais: error budgets, chaos engineering, toil reduction e automações de remediação.`
    },
    {
      id: "34",
      title: "Especialista em FinOps",
      company: "CostGuard",
      location: "Remoto",
      description: `Mapeará custos de cloud, criará visibilidade por tags e unidades de negócio. 
Recomendará reservas, rightsizing e políticas de desligamento automático. 
Trabalhará com alertas, previsões e relatórios executivos. 
Fomentará cultura de propriedade de custo nos times. 
Diferenciais: chargeback/showback, KPIs de eficiência e automações de otimização.`
    },
    {
      id: "35",
      title: "Arquiteto Front-end",
      company: "UIFrameworks",
      location: "São Paulo, SP (Híbrido)",
      description: `Definirá arquitetura de front-end em escala, microfrontends e design systems compartilhados. 
Estabelecerá guidelines de performance, acessibilidade, segurança e testes. 
Criará bibliotecas reutilizáveis, documentação e pipelines. 
Apoiará squads em decisões técnicas e migrações. 
Diferenciais: SSR, Module Federation, monorepo, linting estrito e métricas Web Vitals.`
    },
    {
      id: "36",
      title: "Desenvolvedor Golang",
      company: "GoScale",
      location: "Remoto",
      description: `Construirá serviços concorrentes e eficientes em Go, pensando em memória e latência. 
Aplicará padrões de contexto, cancelamento, timeouts e retries. 
Escreverá testes, perfis de CPU/memória e métricas expostas. 
Integração com bancos, caches e filas de maneira segura. 
Diferenciais: gRPC, protobuf, generics, pprof e ferramentas de análise estática.`
    },
    {
      id: "37",
      title: "Especialista em ETL / ELT",
      company: "PipeLineX",
      location: "Recife, PE (Híbrido)",
      description: `Desenhará camadas de dados claras (staging, core, marts) com qualidade e auditabilidade. 
Orquestrará jobs, tratará falhas e gerenciará dependências. 
Padronizará transformações, versionamento e documentação. 
Garantirá performance com particionamento e compressão. 
Diferenciais: Airflow, DBT, armazenamento columnar, CDC e testes de dados.`
    },
    {
      id: "38",
      title: "Consultor Salesforce",
      company: "CRMForce",
      location: "Remoto",
      description: `Mapeará processos de negócio e traduzirá em objetos, relações e automações no Salesforce. 
Construirá fluxos, relatórios, dashboards e integrações externas. 
Garantirá governança, perfis, permissões e qualidade de dados. 
Capacitará usuários e documentará soluções. 
Diferenciais: Apex/Triggers, Flow avançado, API, experiência com Sales/Service/Marketing Cloud.`
    },
    {
      id: "39",
      title: "Especialista em Elasticsearch",
      company: "SearchGrid",
      location: "Remoto",
      description: `Projetará índices eficientes, estratégias de shards, replicação e políticas de ciclo de vida. 
Afinará análise, relevância, mapeamentos e queries para baixo tempo de resposta. 
Irá monitorar cluster, hot/warm tiers e custos. 
Garantirá observabilidade e backup/restore confiáveis. 
Diferenciais: Kibana, ingest pipelines, search relevance, segurança e otimização de heap.`
    },
    {
      id: "40",
      title: "Administrador Kubernetes",
      company: "KubeOps",
      location: "Remoto",
      description: `Gerenciará clusters Kubernetes com foco em segurança, disponibilidade e custo. 
Definirá políticas de rede, RBAC, quotas e admission controllers. 
Criará estratégias de autoscaling, atualizações e rollback. 
Instrumentará logs, métricas e tracing com padrões claros. 
Diferenciais: Helm, Kustomize, Operators, NetworkPolicy, e policies OPA/Gatekeeper.`
    },
    {
      id: "41",
      title: "Especialista em CDN e Performance Web",
      company: "EdgeSpeed",
      location: "Remoto",
      description: `Desenhará estratégias de caching, edge logic e pré-carregamento para reduzir TTFB/latência. 
Otimizará assets, compressão, imagens e roteamento inteligente. 
Medirá Core Web Vitals e conduzirá melhorias iterativas. 
Integrará feature flags, AB testing e fallback resiliente. 
Diferenciais: HTTP/2/3, server push, image CDNs, edge functions e security headers.`
    },
    {
      id: "42",
      title: "Engenheiro de Integração CI/CD",
      company: "PipelineOps",
      location: "Remoto",
      description: `Padronizará pipelines multi-ambiente, com gates de qualidade, segurança e governança. 
Implementará estratégias de versionamento, artefatos e rollback confiável. 
Automatizará smoke tests, provisionamento e promoção entre ambientes. 
Medirá tempo de ciclo e taxa de falhas para melhoria contínua. 
Diferenciais: GitOps, pipelines como código, caches de build, matrix e políticas de aprovação.`
    },
    {
      id: "43",
      title: "Analista de Growth Tech",
      company: "ScaleBoost",
      location: "Remoto",
      description: `Configurará instrumentação de produto, experimentação e análises de cohort. 
Atuará com feature flags, teste A/B e funis de aquisição/ativação/retensão. 
Criará análises e painéis para orientar decisões rápidas. 
Colaborará com marketing, produto e engenharia. 
Diferenciais: eventos confiáveis, segmentação, atribuição e automações de growth.`
    },
    {
      id: "44",
      title: "Especialista em Chatbots",
      company: "ConversAI",
      location: "Remoto",
      description: `Desenhará fluxos conversacionais eficazes, com NLP e integrações omnichannel. 
Medirá satisfação, tempo de resolução e cobertura de intents. 
Treinará modelos, definirá fallback e melhoria contínua do catálogo. 
Garantirá privacidade, segurança e conformidade. 
Diferenciais: NLU, RAG, analytics conversacional e testes de regressão.`
    },
    {
      id: "45",
      title: "Analista de Dados Geoespaciais",
      company: "GeoMatrix",
      location: "Remoto",
      description: `Processará dados GIS, criará mapas temáticos e análises de roteirização/alcance. 
Trabalhará com projeções, dados raster/vetor e joins espaciais. 
Automatizará ETL geoespacial e publicará camadas. 
Construirá visualizações e relatórios claros. 
Diferenciais: PostGIS, QGIS, geojson, tiles, indexação espacial e otimização de queries.`
    },
    {
      id: "46",
      title: "Especialista em Automação RPA",
      company: "BotFlow",
      location: "Remoto",
      description: `Mapeará processos candidatos, desenhará robôs e orquestração robusta. 
Garantirá segurança, logging e confiabilidade com tratamento de exceções. 
Medirá ROI, throughput e opex de automações. 
Criará documentação e governança de mudanças. 
Diferenciais: desacoplamento de seletores, testes e versionamento de pacotes.`
    },
    {
      id: "47",
      title: "Engenheiro de Qualidade Mobile",
      company: "MobileQA",
      location: "Remoto",
      description: `Criará estratégia de testes mobile (unitários, integração, e2e) cobrindo dispositivos e versões. 
Automatizará cenários, gerenciará labs de devices e relatórios de estabilidade. 
Integrará testes ao CI/CD e definirá critérios de liberação. 
Analisará métricas de crashes, ANR e performance. 
Diferenciais: Appium, Detox, snapshot testing e testes de desempenho real.`
    },
    {
      id: "48",
      title: "Especialista em Data Lake",
      company: "LakeHouse",
      location: "Remoto",
      description: `Organizará camadas do lake (raw, refined, curated) com governança e catálogos. 
Definirá formatos, particionamento e políticas de retenção. 
Controlará metadados, lineage e qualidade. 
Otimizará leitura para diferentes consumidores analíticos. 
Diferenciais: table formats, metastore, ACID no lake e políticas de acesso granular.`
    },
    {
      id: "49",
      title: "Arquiteto de Integrações",
      company: "ConnectBridge",
      location: "Remoto",
      description: `Definirá padrões de integração síncrona/assíncrona, contratos e resiliência. 
Mapeará domínios, eventos e dependências entre sistemas. 
Garantirá observabilidade, versionamento e governança de APIs/eventos. 
Orientará squads em escolhas de acoplamento e consistência. 
Diferenciais: event sourcing, sagas, retries/backoff, circuit breakers e schema registry.`
    },
    {
      id: "50",
      title: "Especialista em Feature Flagging",
      company: "FlagControl",
      location: "Remoto",
      description: `Estruturará lançamentos graduais com segurança, métricas e rollback rápido. 
Criará estratégias de segmentação, experimentação e mitigação de riscos. 
Padronizará flags de curta duração e higiene do inventário. 
Integrará com observabilidade e compliance. 
Diferenciais: kill switches, targetings complexos, auditoria e automação de expiração.`
    },
    {
      id: "51",
      title: "Security DevOps",
      company: "SecPipeline",
      location: "Remoto",
      description: `Integrará scanners SAST/DAST/Dependabot no CI, com gates e triagem eficiente. 
Definirá políticas de secrets, assinaturas e integridade de artefatos. 
Treinará times em SDLC seguro e resposta a vulnerabilidades. 
Medirá tempo de correção e cobertura de segurança. 
Diferenciais: SBOM, assinatura de containers, políticas de branch e pre-commit hooks.`
    },
    {
      id: "52",
      title: "Especialista em ETL em Tempo Real",
      company: "StreamData",
      location: "Remoto",
      description: `Construirá pipelines de streaming com baixa latência, integração via conectores e transformações consistentes. 
Garantirá ordenação, idempotência e reprocessamento seguro. 
Monitorará lag, throughput e falhas com alertas acionáveis. 
Documentará contratos e esquemas versionados. 
Diferenciais: Kafka Connect, Flink, schemas evolutivos e backpressure controlado.`
    },
    {
      id: "53",
      title: "Arquiteto de Microserviços",
      company: "MicroArch",
      location: "São Paulo, SP (Híbrido)",
      description: `Definirá boundaries claros, comunicação resiliente e dados com consistência adequada. 
Padronizará observabilidade distribuída, tracing e contratos. 
Apoiará estratégias de implantação e migração gradual. 
Promoverá reutilização, segurança e governança leve. 
Diferenciais: service mesh, API gateway, SAGA, event-driven e testes de contrato.`
    },
    {
      id: "54",
      title: "Engenheiro de Plataforma",
      company: "PlatformCore",
      location: "Remoto",
      description: `Construirá abstrações, templates e plataformas internas para acelerar squads. 
Padronizará provisionamento, segurança e observabilidade by default. 
Irá medir adoção, reduzir toil e suporte operacional. 
Documentará experiências de desenvolvedor e guias claros. 
Diferenciais: IDP, Backstage, golden paths, scaffolds e catálogos de serviços.`
    },
    {
      id: "55",
      title: "Especialista em Data Quality",
      company: "QualityData",
      location: "Remoto",
      description: `Definirá regras de validação, monitoração de anomalias e acordos de qualidade. 
Implementará testes de dados e alertas baseados em SLAs. 
Manterá catálogo de confiabilidade e documentação de métricas. 
Trabalhará com times para corrigir causas raiz. 
Diferenciais: Great Expectations, checks em pipelines, dashboards e lineage.`
    },
    {
      id: "56",
      title: "Engenheiro de Streaming Analytics",
      company: "StreamOps",
      location: "Remoto",
      description: `Processará eventos em tempo real, criando agregações, janelas e alertas de negócios. 
Garantirá ordenação, consistência e latência controlada. 
Escalará jobs, otimizará estados e evitará hot spots. 
Instrumentará métricas e backpressure. 
Diferenciais: Flink/Spark Streaming, Kafka Streams, CEP e observabilidade.`
    },
    {
      id: "57",
      title: "Analista de Tagueamento Digital",
      company: "TagTrack",
      location: "Remoto",
      description: `Implementará planos de tagueamento robustos com GTM, garantindo qualidade dos eventos. 
Validará disparos, parâmetros e conformidade de privacidade. 
Construirá documentação clara e padronizada. 
Apoiará análises e experimentos com dados confiáveis. 
Diferenciais: consent mode, server-side tagging, versionamento e validações automatizadas.`
    },
    {
      id: "58",
      title: "Especialista em Release Management",
      company: "ReleaseFlow",
      location: "Remoto",
      description: `Coordenação de janelas de release, comunicação e alinhamento entre áreas. 
Aplicará versionamento semântico, critérios de qualidade e rollback controlado. 
Manterá calendário, riscos e indicadores de sucesso. 
Aprimorará processos com automações e métricas. 
Diferenciais: change advisory, release trains, compliance e trilhas de auditoria.`
    },
    {
      id: "59",
      title: "Engenheiro de Sistemas Distribuídos",
      company: "DistSys Labs",
      location: "Remoto",
      description: `Projetará serviços tolerantes a falhas com consistência eventual e escalabilidade horizontal. 
Aplicará padrões de comunicação, cache e particionamento. 
Medirá e otimizará latência, throughput e consumo de recursos. 
Construirá testes e observabilidade distribuída. 
Diferenciais: consenso, quorum, idempotência, retries e design orientado a eventos.`
    },
    {
      id: "60",
      title: "Especialista em Entrega Contínua",
      company: "ContinuousEdge",
      location: "Remoto",
      description: `Otimizará throughput de deploys com segurança, qualidade e previsibilidade. 
Automatizará validações, gates e promoção entre ambientes. 
Mapeará gargalos do fluxo e proporá melhorias. 
Mensurará lead time, frequência de deploy e MTTR. 
Diferenciais: trunk-based, releases pequenas, feature flags e testes em produção controlados.`
    },
    {
      id: "61",
      title: "Engenheiro de Blockchain",
      company: "ChainLabs",
      location: "Remoto",
      description: `Desenvolverá smart contracts seguros, testes e ferramentas de auditoria básica. 
Integrará serviços Web3, carteiras e indexadores. 
Focará em gás, segurança e padrões de upgrade. 
Documentará interfaces e fluxos de integração. 
Diferenciais: Solidity, padrões ERC, auditoria, monitoramento on-chain e segurança cripto.`
    },
    {
      id: "62",
      title: "Data Engineer Spark",
      company: "BigDataFlow",
      location: "São Paulo, SP (Híbrido)",
      description: `Construirá pipelines distribuídos com Spark, otimizando particionamento, shuffle e cache. 
Gerenciará jobs em cluster, tuning e escalabilidade. 
Aplicará testes, validações e observabilidade em dados. 
Trabalhará com formatos columnar e catálogos. 
Diferenciais: Delta/Iceberg/Hudi, structured streaming, custo/tempo e linters de jobs.`
    },
    {
      id: "63",
      title: "Especialista em Accessibility (A11y)",
      company: "InclusiveUI",
      location: "Remoto",
      description: `Auditará interfaces, aplicará ARIA e boas práticas WCAG para experiência inclusiva. 
Validará navegação por teclado, contraste, rótulos e leitores de tela. 
Treinará squads e criará guias e componentes acessíveis. 
Medirá compliance e priorizará melhorias. 
Diferenciais: testes manuais/automatizados, ferramentas de auditoria e design inclusivo.`
    },
    {
      id: "64",
      title: "Engenheiro de Mensageria",
      company: "QueueWorks",
      location: "Remoto",
      description: `Modelará tópicos/filas, garantirá ordenação, reprocessamento e idempotência de eventos. 
Definirá DLQs, políticas de retenção e segurança no tráfego. 
Instrumentará métricas, painéis e alertas de saúde. 
Apoiará squads na modelagem de consumidores/produtores. 
Diferenciais: Kafka/RabbitMQ, schema evolution, backpressure e tuning de brokers.`
    },
    {
      id: "65",
      title: "Especialista em Testes de Segurança",
      company: "PentestPro",
      location: "Remoto",
      description: `Executará testes de intrusão controlados, análise de superfícies e exploração segura. 
Documentará vulnerabilidades, risco e recomendações claras. 
Apoiará correções, validações e retestes. 
Promoverá cultura de segurança com workshops. 
Diferenciais: OWASP, APIs, segurança mobile/web, relatórios executivos e automações.`
    },
    {
      id: "66",
      title: "Engenheiro Edge/IoT",
      company: "EdgeSense",
      location: "Campinas, SP (Presencial)",
      description: `Integrará dispositivos IoT com protocolos adequados e processamento em borda de baixa latência. 
Garantirá segurança, atualização remota e resiliência de comunicação. 
Definirá formatos de mensagens, buffers e tolerância a falhas. 
Medirá consumo, estabilidade e throughput. 
Diferenciais: MQTT, gêmeo digital, OTA, gateways e stream processing.`
    },
    {
      id: "67",
      title: "Especialista em Gestão de Incidentes",
      company: "IncidentFlow",
      location: "Remoto",
      description: `Liderará resposta a incidentes críticos, coordenação e comunicação clara. 
Manterá runbooks, métricas operacionais e rituais de melhoria. 
Conduzirá post-mortems sem culpa e planos de ação. 
Priorizará redução de MTTR e prevenção sistêmica. 
Diferenciais: War rooms, automação de incidentes, SLOs e relatórios executivos.`
    },
    {
      id: "68",
      title: "Engenheiro de Feature Experimentation",
      company: "ExpLab",
      location: "Remoto",
      description: `Desenhará experimentos sólidos (A/B), definindo métricas, poder estatístico e análise. 
Implementará instrumentação, segmentações e guardrails. 
Apresentará resultados com clareza e recomendações de rollout. 
Trabalhará com compliance e privacidade de dados. 
Diferenciais: experimentação online, CUPED, detecção precoce e automação de análises.`
    },
    {
      id: "69",
      title: "Especialista em Cache Distribuído",
      company: "CacheLayer",
      location: "Remoto",
      description: `Desenhará camadas de cache para reduzir latência, com estratégias de invalidação seguras. 
Afinará Redis/Memcached, tamanhos, TTLs e políticas de substituição. 
Medirá acertos, cold starts e impacto no throughput. 
Garantirá consistência eventual aceitável e observabilidade. 
Diferenciais: caches por região, write-through/behind, locks e sharding.`
    },
    {
      id: "70",
      title: "Engenheiro de Documentação Técnica",
      company: "DocuCore",
      location: "Remoto",
      description: `Estruturará documentação viva (Docs as Code), versionada e fácil de navegar. 
Padronizará guias, referências de API, tutoriais e playbooks. 
Criará pipelines de validação, revisão e publicação automatizada. 
Medirá adoção, completude e feedbacks dos usuários. 
Diferenciais: Markdown, linting de docs, snippets testáveis e design de informação.`
    }
  ],
  total: 70
}