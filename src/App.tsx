import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./screens/home";
import { routes } from "./routes";
import Layout from "./layouts/pageLayout";
import Directory from "./screens/directory/directory";
import SubscriptionPricing from "./screens/directory/subscriptionPlan/subPlan";
import NotClaim from "./screens/directory/notClaim/directoryDetails";
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
import SubmittedSuccessfully from "./customs/detailsubmitted";
import Login from "./screens/Auth/login";
import SignUp from "./screens/Auth/signUp";
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
import ApplyForJob from "./screens/job/applytoStrive/index";
import PostJob from "./screens/job/postJob/postJob";

import AddBusiness from "./screens/job/postJob/addBusiness/addBusiness";

import Images from "./screens/directory/gallery/image";
import Videos from "./screens/directory/gallery/video";
import Profile from "./screens/profile/profile";
import EditBusiness from "./screens/profile/editBusiness/editBusiness";
import ViewJobDetails from "./screens/profile/businessInformation/postedJob/viewJobDetails/viewJob";


function App() {
  const appRoutes = [
    { path: routes.page.home, element: <HomePage /> },
    { path: routes.page.market, element: <Market /> },
    { path: routes.page.homeMarket, element: <Market /> },
    { path: routes.page.productDetails, element: <ProductDetails /> },
    { path: routes.page.relatedAds, element: <RelatedAds /> },
    { path: routes.page.review, element: <Review /> },
    { path: routes.page.productReview, element: <ProductReview /> },

    { path: routes.page.sellersProfile, element: <SellersProfile /> },
    { path: routes.page.posetedAdsBySeller, element: <SellersPostedAds /> },
    { path: routes.page.writeReviewForBusiness, element: <WriteReview /> },
    { path: routes.page.ContactUs, element: <ContactUs /> },
    { path: routes.page.AboutUS, element: <AboutUs /> },
    { path: routes.page.faq, element: <FAQ /> },
    { path: routes.directory.directory, element: <Directory /> },
    { path: routes.directory.homeDirectory, element: <Directory /> },

    { path: routes.directory.NotClaimed, element: <NotClaim /> },
    { path: routes.directory.relatedBusinesses, element: <RelatedBusinesses /> },
    { path: routes.directory.SubscriptionPricing, element: <SubscriptionPricing /> },
    { path: routes.directory.ClaimBusiness, element: <ClaimBusiness /> },
    // { path: routes.directory.ClaimedBusiness, element: <ClaimedBusiness /> },
    {
      path: routes.directory.SubmittedSuccessfully,
      element: <SubmittedSuccessfully />,
    },

    { path: routes.job.job, element: <Job /> },
    { path: routes.job.homeJob, element: <Job /> },

    { path: routes.job.jobDetails, element: <JobDetails /> },
    { path: routes.job.JobLikeThis, element: <JobLikeThis /> },
    { path: routes.job.images, element: <Images /> },
    { path: routes.job.videos, element: <Videos /> },
    { path: routes.job.RegAsApplicant, element: <RegisterAsApplicant /> },
    { path: routes.job.AddBusiness, element: <AddBusiness /> },
    { path: routes.job.applyForJob, element: <ApplyForJob /> },
    { path: routes.job.postJob, element: <PostJob /> },

    { path: routes.profile.profile, element: <Profile /> },

    { path: routes.profile.editBusiness, element: <EditBusiness /> },
    { path: routes.profile.viewJobDetails, element: <ViewJobDetails /> },

 
  ];

  const authRoutes = [
    { path: routes.auth.signUp, element: <SignUp /> },
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
