import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from './AppRoutes';


const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            {AppRoutes.map((route) => 
                <Route 
                path={route.path} 
                element={route.element} 
                exact={route.exact} 
                key={route.path}/>
            )}
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter