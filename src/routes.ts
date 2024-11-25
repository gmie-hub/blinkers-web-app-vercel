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

    directory: "/directory",
    NotClaimed: "/not-claim/:id",
    relatedBusinesses: "/related-businesses",
    Subscription: "/subscription",
    profile: "/profile",

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
