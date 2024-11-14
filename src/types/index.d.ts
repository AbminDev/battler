export {};
declare global {
  interface Window {
    tgAppInited?: boolean;
    Telegram: {
      WebApp: any;
    };
  }
}
declare module 'redux-persist/lib/storage/session' {
  import { Storage } from 'redux-persist';
  const storage: Storage;
  export default storage;
}
