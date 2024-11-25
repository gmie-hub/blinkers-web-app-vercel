
export const routes = {
  // home: "/",
  page: {
    home: "/",
    market: "/market",
    productDetails: "/product-details/:id",
    relatedAds: "/related-ads",
    review: "/review",
    sellersProfile: "/sellers-profile",
    posetedAdsBySeller: "/sellers-posted-ads",
    writeReview: "/write-review",
    ContactUs: "/contact-us",
    AboutUS: "/about-us",
    faq: "/faq",
   
  },
  job:{
    job: "/jobs",
    jobDetails: "/job-details",
    JobLikeThis: "/job/more-jobs-like-this",
    images: "/images",
    videos: "/videos",
    RegAsApplicant: "/job/register-as-applicant",
    AddBusiness: "/job/add-business",
    applyForJob:"/job/apply",
    postJob:"/post-job",


  },

  directory:{
    directory: "/directory",
    NotClaimed: "/not-claim/:id",
    relatedBusinesses: "/related-businesses",
    Subscription: "/subscription",
    SubscriptionPricing: "/subscription-pricing",
    ClaimedBusiness: "/claimed-business",
    ClaimBusiness: "/claim-business",
    SubmittedSuccessfully: "/submittedsuccessfully",
  
  },

  auth: {
    login: "/login",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    passwordResetSuccessful: "/password-reset-successful",
    VerificationCode: "/verification-code",
  },
};




export const routeParts = {
  [routes.page.market]: {
    route: routes.page.home,
    name: 'All Business',
    params: '',
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