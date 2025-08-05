/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.jsx" {
  const Component: React.ComponentType<any>;
  export default Component;
}