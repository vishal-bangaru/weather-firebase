import './App.css';
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Home from './Home';
import Login from './Login'
import Register from './Register'
import RootLayout from './RootLayout';
import Homepage from './Homepage';
import Table from './Table';
function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      children:[
       {
        path:"/",
        element: <Login  />
       },
       {
        path:"/register",
        element:<Register />
       },
       {
        path:"/homepage",
        element:<Homepage />
       },
       {
        path:"/table",
        element:<Table />
       }
      ]
    }
  ])
  return (
    <div >
    
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
