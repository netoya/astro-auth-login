import { sequence } from "astro:middleware";
import { sessionMiddleware } from "./sessionMiddleware";
import { userMiddleware } from "./userMiddleware";
import { cartMiddleware } from "./cartMiddleware";

export const onRequest = sequence(
  sessionMiddleware,
  userMiddleware,
  cartMiddleware
);
