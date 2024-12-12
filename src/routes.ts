export const routes = {
  // home: "/",
  page: {
    home: "/",
    market: "/market",
    productDetails: "/product-details/:id",
    relatedAds: "/related-ads/:id",
    review: "/review/:id",
    productReview: "/product-review/:id",
    sellersProfile: "/sellers-profile/:id",
    posetedAdsBySeller: "/sellers-posted-ads",
    writeReview: "/write-review/:id",
    ContactUs: "/contact-us",
    AboutUS: "/about-us",
    faq: "/faq",
    homeMarket: "/market/:search",
  },
  job: {
    job: "/jobs",
    homeJob: "/jobs/:search",
    jobDetails: "/job-details/:id",
    JobLikeThis: "/job/more-jobs-like-this/:id",
    images: "/images",
    videos: "/videos",
    RegAsApplicant: "/job/register-as-applicant",
    AddBusiness: "/job/add-business",
    applyForJob: "/job/apply/:id",
    postJob: "/post-job",
  },

  directory: {
    directory: "/directory",
    homeDirectory: "/directory/:search",
    NotClaimed: "/directory-details/:id",
    relatedBusinesses: "/related-businesses/:id",
    Subscription: "/subscription",
    SubscriptionPricing: "/subscription-pricing/:id",
    ClaimedBusiness: "/claimed-business",
    ClaimBusiness: "/claim-business/:id",
    SubmittedSuccessfully: "/submittedsuccessfully",
  },

  auth: {
    signUp: "/sign-up",
    login: "/login",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password/:email",
    passwordResetSuccessful: "/password-reset-successful",
    VerificationCode: "/verification-code/:email",
    ResetVerificationCode: "/reset-password-verification-code/:email/",
  },
};

export const routeParts = {
  [routes.page.market]: {
    route: routes.page.home,
    name: "All Business",
    params: "",
    isRoot: true,
  },
  // [routes.directory.viewBusiness]: {
  //   route: routes.directory.viewBusiness,
  //   name: 'View Business',
  //   params: '1',
  //   isRoot: false,
  // },
  // [routes.directory.editBusiness]: {
  //   route: routes.directory.editBusiness,
  //   name: 'Edit Business',
  //   params: '1',
  // },

  // [routes.jobs.viewJobDetails]: {
  //   route: routes.jobs.viewJobDetails,
  //   name: 'View Job Details',
  //   params: '',
  //   isRoot: false,
  // },
  // [routes.jobs.editJob]: {
  //   route: routes.jobs.editJob,
  //   name: 'Edit Job',
  //   params: '1',
  //   isRoot: false,
  // },
  // [routes.jobs.jobs]: {
  //   route: routes.jobs.jobs,
  //   name: 'Jobs',
  //   params: '',
  //   isRoot: true,
  // },
};
