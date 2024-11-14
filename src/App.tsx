import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./screens/home";
import { routes } from "./routes";
import Layout from "./layouts/pageLayout";
import DirectoryPage from "./screens/directory";
import NotClaimed from "./screens/notClaimed/notClaimed";
import Subscription from "./screens/subscribe";
import Market from "./screens/home/market/market";
import ProductDetails from "./screens/home/market/productDetails/smallScreenSellerDetails";
import RelatedAds from "./screens/home/relatedAds/relatedAds";
import Review from "./screens/home/market/review/review";
import SellersProfile from "./screens/home/sellersProfile/sellersProfile";
import SellersPostedAds from "./screens/home/sellersProfile/postedAds/adsPostedbySeller";
import WriteReview from "./screens/home/market/writeReview/writeReview";

function App() {
  const appRoutes = [
    { path: routes.page.home, element: <HomePage /> },
    { path: routes.page.market, element: <Market /> },
    { path: routes.page.productDetails, element: <ProductDetails /> },
    { path: routes.page.directory, element: <DirectoryPage /> },
    { path: routes.page.NotClaimed, element: <NotClaimed /> },
    { path: routes.page.Subscription, element: <Subscription />},
    { path: routes.page.relatedAds, element: <RelatedAds />},
    { path: routes.page.review, element: <Review />},
    { path: routes.page.sellersProfile, element: <SellersProfile />},
    { path: routes.page.posetedAdsBySeller, element: <SellersPostedAds />},
    { path: routes.page.writeReview, element: <WriteReview />},

  ];
  return (
    <Routes>
      <Route element={<Layout />}>
        {appRoutes.map((item) => (
          <Route path={item.path} element={item.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
