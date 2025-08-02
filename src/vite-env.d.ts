/// <reference types="vite/client" />

interface ViteTypeOptions {
  readonly API_BASE_URL: string
}

interface ImportMetaEnv {
  readonly API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}