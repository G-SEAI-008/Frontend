import 'vite/client';

declare global {
  interface ImportMetaEnv {
    readonly VITE_EVENTS_API_URL: string;
  }
}
