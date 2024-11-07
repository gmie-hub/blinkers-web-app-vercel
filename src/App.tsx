import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './screens/home/index'
import { routes } from './routes';

function App() {

  const appRoutes = [
    { path: routes.page .home, element: <HomePage /> },

  


  ];
  return (
    <Routes>
      <Route>
        {appRoutes.map((item,index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Route>
      

     
    </Routes>
  );
}

export default App
