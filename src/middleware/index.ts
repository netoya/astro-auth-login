import { sequence } from "astro:middleware";
import { sessionMiddleware } from "./sessionMiddleware";

export const onRequest = sequence(sessionMiddleware);
