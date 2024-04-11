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
    requests: "/dashboard/collections/:collectionId/:requestId",
    environments: "/dashboard/environments",
    environment: "/dashboard/environments/:id",
  },
};

export const publicPaths = [
  paths.home,
  paths.login,
  paths.register,
  paths.notFound,
  paths.resetPassword,
];
