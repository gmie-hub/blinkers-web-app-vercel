import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./screens/home";
import { routes } from "./routes";
import Layout from "./layouts/pageLayout";
import Directory from "./screens/directory/directory";
import SubscriptionPricing from "./screens/directory/subscriptionPlan/subPlan";
import NotClaim from "./screens/directory/notClaim/notClaim";
import ClaimBusiness from "./screens/directory/claimBusiness/claimBus";
import ClaimedBusiness from "./screens/directory/claimed/claimed";
import RelatedBusinesses from "./screens/directory/relatedBusinesses/relatedBusiness";
import Market from "./screens/home/market/market";
import ProductDetails from "./screens/home/market/productDetails/productDetailsToDisplay";
import RelatedAds from "./screens/home/relatedAds/relatedAds";
import Review from "./screens/home/market/review/review";
import SellersProfile from "./screens/home/sellersProfile/sellersProfile";
import SellersPostedAds from "./screens/home/sellersProfile/postedAds/adsPostedbySeller";
// import WriteReview from "./screens/home/market/writeReview/writeReview";
import SubmittedSuccessfully from "./customs/detailsubmitted";
import Login from "./screens/Auth/login";
import AuthLayout from "./screens/Auth/authLayout";
import ForgotPassword from "./screens/Auth/forgotPassword";
import ResetPassword from "./screens/Auth/resetPassword";
import PasswordResetPassword from "./screens/Auth/sucessPassword/passwordResetSuccessful";
import VerificationCode from "./screens/Auth/verificationCode";
import ContactUs from "./screens/contactUs/contactUs";
import AboutUs from "./screens/aboutUs/aboutUs";
import FAQ from "./screens/FAQ/faq";

function App() {
  const appRoutes = [
    { path: routes.page.home, element: <HomePage /> },
    { path: routes.page.market, element: <Market /> },
    { path: routes.page.productDetails, element: <ProductDetails /> },
    { path: routes.page.directory, element: <Directory /> },
    { path: routes.page.relatedAds, element: <RelatedAds /> },
    { path: routes.page.review, element: <Review /> },
    { path: routes.page.sellersProfile, element: <SellersProfile /> },
    { path: routes.page.posetedAdsBySeller, element: <SellersPostedAds /> },
    // { path: routes.page.writeReview, element: <WriteReview /> },
    { path: routes.page.ContactUs, element: <ContactUs /> },
    { path: routes.page.AboutUS, element: <AboutUs /> },
    { path: routes.page.faq, element: <FAQ /> },
    { path: routes.page.NotClaimed, element: <NotClaim /> },
    { path: routes.page.relatedBusinesses, element: <RelatedBusinesses /> },
    { path: routes.page.SubscriptionPricing, element: <SubscriptionPricing /> },
    { path: routes.page.ClaimBusiness, element: <ClaimBusiness /> },
    { path: routes.page.ClaimedBusiness, element: <ClaimedBusiness /> },

    {
      path: routes.page.SubmittedSuccessfully,
      element: <SubmittedSuccessfully />,
    },
  ];

  const authRoutes = [
    { path: routes.auth.login, element: <Login /> },
    { path: routes.auth.forgotPassword, element: <ForgotPassword /> },
    { path: routes.auth.resetPassword, element: <ResetPassword /> },
    {
      path: routes.auth.passwordResetSuccessful,
      element: <PasswordResetPassword />,
    },
    { path: routes.auth.VerificationCode, element: <VerificationCode /> },
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
