import { SessionStrapiManager } from "@functions/session-strapi";

export async function sessionMiddleware(Astro, next) {
  const sessionID = await SessionStrapiManager.getID(Astro);
  const sm = new SessionStrapiManager(Astro, sessionID);
  console.log("sessionID", sessionID);

  // set cookie
  Astro.cookies.set("astro-session", sessionID);
  Astro.locals.session = sm;
  const data = await sm.getData();
  console.log({ data });
  return next();
}
