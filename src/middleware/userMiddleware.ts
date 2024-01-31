export async function userMiddleware(Astro, next) {
  const { session = {} } = Astro.locals;

  let data = await session.getData();

  if (!data) {
    return next();
  }

  const token = data.user?.jwt;

  if (!token) {
    return next();
  }

  // fetch strapi users/me
  const user = await fetch("http://localhost:1337/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

  if (!user) {
    session.save({ user: null });
    return next();
  }

  Astro.locals.user = user;

  console.log({ user });
  return next();
}
