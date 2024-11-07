import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./screens/home/index";
import { routes } from "./routes";
import Layout from "./layouts/pageLayout";

function App() {
  const appRoutes = [{ path: routes.page.home, element: <HomePage /> }];
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
