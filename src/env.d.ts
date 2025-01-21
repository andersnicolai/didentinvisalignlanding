/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly DEV: boolean
  // flere miljøvariabler...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 