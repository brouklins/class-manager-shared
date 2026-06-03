# class-manager-shared

Pacote compartilhado da plataforma `class-manager` com:

- Schemas Zod
- Tipos inferidos
- Contratos comuns de API
- Enums e utilitários puros de domínio

## Requisitos

- Node.js 22
- pnpm

## Scripts

- `pnpm build`
- `pnpm test`
- `pnpm typecheck`

## Instalação local

```bash
pnpm install
```

## Publicação

O pacote é privado e deve ser publicado no GitHub Packages com o nome:

```txt
@brouklins/class-manager-shared
```

Para publicar manualmente:

```bash
NODE_AUTH_TOKEN=<github_token> pnpm publish --no-git-checks
```

O workflow em `.github/workflows/publish.yml` também pode ser usado.

## Consumo em outros repositórios

Adicionar em `.npmrc`:

```txt
@brouklins:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Instalar:

```bash
pnpm add @brouklins/class-manager-shared
```

## Versionamento

- `patch`: correções internas sem quebrar contratos públicos
- `minor`: novos exports ou novos campos opcionais
- `major`: mudança breaking em schemas, tipos ou contratos

