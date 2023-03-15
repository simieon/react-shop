import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Home from './components/home';
import DefaultHeader from './components/containers/default/DefaultHeader';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './components/containers/default';
import Login from './components/login';
import Registration from './components/registration';
import NotFoundPage from './components/not_found';
import AddCategory from './components/categories/create';
import Add from './components/categories/create';
import CategoryCreatePage from './components/categories/create';
import ProductCreatePage from './components/products/create/ProductCreatePage';
import ProductListPage from './components/products/list';
import ProductEditPage from './components/products/edit';
const App = () => {

  useEffect(() => {
    console.log("use effect App");
    axios.get("http://localhost:8083/api/categories")
      .then(resp => {
        console.log("Server result", resp);
      });
  }, []);
  
  
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} /> 
          <Route path="registration" element={<Registration />} />
          <Route path="categories/create" element={<CategoryCreatePage />} />
          <Route path="products/create" element={<ProductCreatePage />} />
          <Route path="products/list" element={<ProductListPage />} />
          <Route path="products/edit/:id" element={<ProductEditPage />} />
          {/* <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} /> */}

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NotFoundPage/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
