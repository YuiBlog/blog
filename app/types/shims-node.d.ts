declare namespace NodeJS {
  interface Process {
    client: boolean;
    server: boolean;
    browser: boolean;
  }

  interface ProcessEnv {
    FIREBASE_CLIENT_API_KEY: string;
    FIREBASE_CLIENT_AUTH_DOMAIN: string;
    FIREBASE_CLIENT_DATABASE_URL: string;
    FIREBASE_CLIENT_PROJECT_ID: string;
    FIREBASE_CLIENT_STORAGE_BUCKET: string;
    FIREBASE_CLIENT_MESSAGING_SENDER_ID: string;
    FIREBASE_HOSTING_URL: string;
  }
}
