/// <reference types="astro/client" />

import { SessionStrapiManager } from "@functions/session-strapi";

declare namespace App {
  interface Locals {
    session: SessionStrapiManager;
  }
}

interface ImportMetaEnv {
  readonly API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
