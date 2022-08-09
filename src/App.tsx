import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Layout } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/login/login";
import Wrapper from "./components/wrapper/wrapper";
import {ToastContainer} from "react-toastify";
import {AddNews} from "./components/news/addNews/addNews";
import {NewsList} from "./components/news/newsList/newsList";
import {EditNews} from "./components/news/editNews/editNews";
import 'moment/locale/ru';
import {GalleryList} from "./components/gallery/galleryList/galleryList";
import {EditGallery} from "./components/gallery/editGallery/editGallery";
import {AddGallery} from "./components/gallery/addGallery/addGallery";

function App() {

  const token = localStorage.getItem('token');

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/'} element={<Wrapper token={token}/>}>
            <Route path={'/news/add'} element={<AddNews/>}/>
            <Route path={'/news'} element={<NewsList/>}/>
            <Route path={'/news/:id'} element={<EditNews/>}/>
            <Route path={'/gallery/add'} element={<AddGallery/>}/>
            <Route path={'/gallery'} element={<GalleryList/>}/>
            <Route path={'/gallery/:id'} element={<EditGallery/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
