import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./screens/home";
import { routes } from "./routes";
import Layout from "./layouts/pageLayout";
import Directory from "./screens/directory/directory";
import SubscriptionPricing from "./screens/directory/subscriptionPlan/subPlan";
import NotClaim from "./screens/directory/directoryDeails/directoryDetails";
import ClaimBusiness from "./screens/directory/claimBusiness/claimBus";
// import ClaimedBusiness from "./screens/directory/claimed/claimed";
import RelatedBusinesses from "./screens/directory/relatedBusinesses/relatedBusiness";
import Market from "./screens/home/market/market";
import ProductDetails from "./screens/home/market/productDetails/productDetailsToDisplay";

import RelatedAds from "../src/partials/relatedAds/index";
import Review from "./screens/home/market/review/review";
import ProductReview from "./screens/home/market/review/productReview";
import SellersProfile from "./screens/home/sellersProfile/sellersProfile";
import SellersPostedAds from "./screens/home/sellersProfile/postedAds/adsPostedbySeller";
import WriteReview from "./screens/home/market/writeReview/reviewBusiness";
import WriteReviewForUser from "./screens/home/market/writeReview/reviewAds";
import SubmittedSuccessfully from "./customs/detailsubmitted";
import Login from "./screens/Auth/login";
import SignUp from "./screens/Auth/signUp";
import SellerSignup from "./screens/Auth/sellerSignup";
import AuthLayout from "./screens/Auth/authLayout";
import ForgotPassword from "./screens/Auth/forgotPassword";
import ResetPassword from "./screens/Auth/resetPassword";
import PasswordResetPassword from "./screens/Auth/sucessPassword/passwordResetSuccessful";
import VerificationCode from "./screens/Auth/verificationCode";
import ResetVerificationCode from "./screens/Auth/resetPasswordVerification";
import ContactUs from "./screens/contactUs/contactUs";
import AboutUs from "./screens/aboutUs/aboutUs";
import FAQ from "./screens/FAQ/faq";
import Job from "./screens/job/job";
import JobDetails from "./screens/job/jobDetails/jobDetails";
import JobLikeThis from "./screens/job/jobLikeThis/jobsLikeThis";
import RegisterAsApplicant from "./screens/job/apply/applyAsApplicant/index";
import PostJob from "./screens/job/postJob/postJob";
import EditJob from "./screens/job/postJob/postJob";
import AddBusiness from "./screens/job/postJob/addBusiness/addBusiness";
import Images  from "./screens/directory/gallery/image";
import Videos from "./screens/directory/gallery/video";
import Profile from "./screens/profile/profile";
import EditBusiness from "./screens/profile/editBusiness/editBusiness";
import ViewJobDetails from "./screens/profile/businessInformation/postedJob/viewJobDetails/viewJob";
import Applicants from "./screens/profile/businessInformation/postedJob/applicants/applicant";
import ViewApplicant from "./screens/profile/businessInformation/postedJob/applicants/viewApplicantDetails/viewApplicant";
import CreateAd from "./screens/profile/myAds/createAds";
import EditAds from "./screens/profile/myAds/editAd";
import MyAds from "./screens/profile/myAds/myAds";
import MyApplicantsDetails from "./screens/profile/myApplication/myApplicationDetails";
import SellerVerification from "./screens/Auth/sellerVerificationModal";
import Notification from "./screens/notification";
import ViewNotification from "./screens/notification/viewNotification";
import TermsCondition from "./screens/footerPages/termsCondition";
import SafetyTips from "./screens/footerPages/safetyTips";
import HowToBuy from "./screens/footerPages/howTobuy";
import HowToSell from "./screens/footerPages/howToSell";
import Pricing from "./screens/pricing/pricing";
import PopularJobs from "./screens/job/popularJob/popularJob";
import JobsForYou from "./screens/job/jobForYou/forYou";
import TopBusinesses from "./screens/directory/topBusiness/topBusiness";
import RecommendedBusinesses from "./screens/directory/recommended/recommendedBusiness";

function App() {
  const appRoutes = [
    { path: routes.page.home, element: <HomePage /> },
    { path: routes.page.market, element: <Market /> },
    // { path: routes.page.homeMarket, element: <Market /> },
    { path: routes.page.productDetails, element: <ProductDetails /> },
    { path: routes.page.newproductDetails, element: <ProductDetails /> },

    { path: routes.page.relatedAds, element: <RelatedAds /> },
    { path: routes.page.review, element: <Review /> },
    { path: routes.page.productReview, element: <ProductReview /> },

    { path: routes.page.sellersProfile, element: <SellersProfile /> },
    { path: routes.page.posetedAdsBySeller, element: <SellersPostedAds /> },
    { path: routes.page.writeReviewForBusiness, element: <WriteReview /> },
    { path: routes.page.writeReviewSeller, element: <WriteReviewForUser /> },
    { path: routes.page.terms, element: <TermsCondition /> },
    { path: routes.page.safetyTips, element: <SafetyTips /> },
    { path: routes.page.howToBuy, element: <HowToBuy /> },
    { path: routes.page.howToSell, element: <HowToSell /> },

    
    { path: routes.page.ContactUs, element: <ContactUs /> },
    { path: routes.page.AboutUS, element: <AboutUs /> },
    { path: routes.page.faq, element: <FAQ /> },
    { path: routes.page.notifications, element: <Notification /> },
    { path: routes.page.viewNotification, element: <ViewNotification /> },

    { path: routes.directory.directory, element: <Directory /> },
    { path: routes.directory.homeDirectory, element: <Directory /> },

    { path: routes.directory.NotClaimed, element: <NotClaim /> },
    { path: routes.directory.newNotClaimed, element: <NotClaim /> },

    { path: routes.directory.relatedBusinesses, element: <RelatedBusinesses /> },
    { path: routes.directory.SubscriptionPricing, element: <SubscriptionPricing /> },
    { path: routes.directory.ClaimBusiness, element: <ClaimBusiness /> },
    { path: routes.directory.topBusinesses, element: <TopBusinesses /> },
    { path: routes.directory.recommendedBusinesses, element: <RecommendedBusinesses /> },

    // { path: routes.directory.ClaimedBusiness, element: <ClaimedBusiness /> },
    {
      path: routes.directory.SubmittedSuccessfully,
      element: <SubmittedSuccessfully />,
    },

    { path: routes.job.job, element: <Job /> },
    { path: routes.job.homeJob, element: <Job /> },

    { path: routes.job.jobDetails, element: <JobDetails /> },
    { path: routes.job.newjobDetails, element: <JobDetails /> },

    { path: routes.job.JobLikeThis, element: <JobLikeThis /> },
    { path: routes.job.images, element: <Images /> },
    { path: routes.job.videos, element: <Videos /> },
    { path: routes.job.RegAsApplicant, element: <RegisterAsApplicant /> },
    { path: routes.job.AddBusiness, element: <AddBusiness /> },
    { path: routes.job.postJob, element: <PostJob /> },
    { path: routes.job.editJob, element: <EditJob/> },
    { path: routes.job.popular, element: <PopularJobs/> },
    { path: routes.job.forYou, element: <JobsForYou/> },

    { path: routes.profile.profile, element: <Profile /> },

    { path: routes.profile.editBusiness, element: <EditBusiness /> },
    { path: routes.profile.viewJobDetails, element: <ViewJobDetails /> },
    { path: routes.profile.applicants, element: <Applicants /> },
    { path: routes.profile.viewApplicant, element: <ViewApplicant /> },

    { path: routes.profile.createAd, element: <CreateAd /> },
    { path: routes.profile.editAds, element: <EditAds /> },

    { path: routes.profile.myAds, element: <MyAds /> },
    { path: routes.profile.myapplicationDetails, element: <MyApplicantsDetails /> },
    { path: routes.pricing.pricing, element: <Pricing /> },

  ];

  const authRoutes = [
    { path: routes.auth.signUp, element: <SignUp /> },
    { path: routes.auth.SellerSignUp, element: <SellerSignup /> },
    { path: routes.auth.sellerVerification, element: <SellerVerification /> },

    { path: routes.auth.login, element: <Login /> },
    { path: routes.auth.forgotPassword, element: <ForgotPassword /> },
    { path: routes.auth.resetPassword, element: <ResetPassword /> },
    {
      path: routes.auth.passwordResetSuccessful,
      element: <PasswordResetPassword />,
    },
    { path: routes.auth.VerificationCode, element: <VerificationCode /> },
    { path: routes.auth.ResetVerificationCode, element: <ResetVerificationCode /> },

  ];
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        {authRoutes.map((item) => (
          <Route path={item.path} element={item.element} />
        ))}
      </Route>

      <Route element={<Layout />}>
        {appRoutes.map((item) => (
          <Route path={item.path} element={item.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
