import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {CompanyPage, SearchPage} from './features/search/pages';
import {Layout} from './layout';


const AppRoutes = () => (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<SearchPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/company" element={<CompanyPage />} />
      </Route>
      <Route path="*" element={<SearchPage />} />
    </Routes>
  );
  
  export default AppRoutes;