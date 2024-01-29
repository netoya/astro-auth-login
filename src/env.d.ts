/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import { SessionStrapiManager } from "@functions/session-strapi";

declare namespace App {
  interface Locals {
    session: SessionStrapiManager;
  }
}
