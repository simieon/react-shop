import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Home from './components/home';
import { Route, Routes } from 'react-router-dom';
import Login from './components/auth/login';
import Registration from './components/auth/registration';
import NotFoundPage from './components/not_found';
import ProductCreatePage from './components/products/create/ProductCreatePage';
import ProductListPage from './components/products/list';
import ProductEditPage from './components/products/edit';
import ProductItemPage from './components/item/ProductItemPage';
import DefaultLayout from './components/containers/default/DefaultLayout';
import AdminCategoryCreatePage from './components/admin/categories/create/AdminCategoryCreatePage';
import AdminHome from './components/admin/home';
import AdminLayout from './components/containers/admin/AdminLayout';
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
          <Route path="categories/create" element={<AdminCategoryCreatePage />} />
          <Route path="products/create" element={<ProductCreatePage />} />
          <Route path="products/list" element={<ProductListPage />} />
          <Route path="products/edit/:id" element={<ProductEditPage />} />
          <Route path="products/view/:id" element={<ProductItemPage />} />
          {/* <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} /> */}

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NotFoundPage/>} />
        </Route>

        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<AdminHome />} />
          <Route path="categories/create" element={<AdminCategoryCreatePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
