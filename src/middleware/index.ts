import { sequence } from "astro:middleware";
import { sessionMiddleware } from "./sessionMiddleware";
import { userMiddleware } from "./userMiddleware";

export const onRequest = sequence(sessionMiddleware, userMiddleware);
