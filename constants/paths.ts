export const paths = {
  home: "/",
  login: "/login",
  register: "/register",
  resetPassword: "/reset-password",
  profile: "/profile",
  notFound: "/404",
  dashboard: {
    index: "/dashboard",
    collections: "/dashboard/collections",
    collection: "/dashboard/collections/:id",
    environments: "/dashboard/environments",
  },
};

export const publicPaths = [
  paths.home,
  paths.login,
  paths.register,
  paths.notFound,
  paths.resetPassword,
];
