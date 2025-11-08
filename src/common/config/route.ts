export const route = {
  home: {
    path: "/",
  },
  about: {
    path: "/about-us",
  },
  findCenters: {
    path: "/find-centers",
  },
  doctors: {
    path: "/doctor",
  },
  doctorsList: {
    path: "/doctors-list",
  },
  labTests: {
    path: "/lab-test",
  },
  emergencyCare: {
    path: "/emergency-care",
  },
  contact: {
    path: "/contact",
  },
  faq: {
    path: "/faq",
  },
  careers: {
    path: "/careers",
  },
  blog: {
    path: "/blog",
  },
  blogPost: (slug: string) => ({
    path: `/blog/${slug}`,
  }),
  patients: {
    path: "/patients",
  },
  partnerships: {
    path: "/partnerships",
  },
  privacyPolicy: {
    path: "/privacy-policy",
  },
  termsOfService: {
    path: "/terms-of-service",
  },
  signIn: {
    path: "/sign-in",
  },
  signUp: {
    path: "/sign-up",
  },
  dashboard: {
    path: "/dashboard",
  },
  dashboardFindCenters: {
    path: "/dashboard/find-centers",
  },
  dashboardDoctors: {
    path: "/dashboard/doctors",
  },
  dashboardLabs: {
    path: "/dashboard/lab-tests",
  },
};
