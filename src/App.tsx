import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./screens/home/index";
import { routes } from "./routes";
import Layout from "./layouts/pageLayout";
import DirectoryPage from "./screens/directory";
import NotClaimed from "./screens/notClaimed/notClaimed";
import Subscription from "./screens/subscribe";

function App() {
  const appRoutes = [
    { path: routes.page.home, element: <HomePage /> },
    { path: routes.page.directory, element: <DirectoryPage /> },
    { path: routes.page.NotClaimed, element: <NotClaimed /> },
    { path: routes.page.Subscription, element: <Subscription />}
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
