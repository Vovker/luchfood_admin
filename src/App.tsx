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
import {EventTypes} from "./components/events/eventTypes/eventTypes";
import {AddEvent} from "./components/events/addEvent/addEvent";
import {EventsList} from "./components/events/eventsList/eventsList";
import {EditEvent} from "./components/events/editEvent/editEvent";
import {CornerTypes} from "./components/corners/cornerTypes/cornerTypes";
import {AddCorner} from "./components/corners/addCorner/addCorner";
import {CornersList} from "./components/corners/cornersList/cornersList";
import {EditCorner} from "./components/corners/editCorner/editCorner";

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
            <Route path={'/events/types'} element={<EventTypes/>}/>
            <Route path={'/events/add'} element={<AddEvent/>}/>
            <Route path={'/events'} element={<EventsList/>}/>
            <Route path={'/events/:id'} element={<EditEvent/>}/>
            <Route path={'/corners/types'} element={<CornerTypes/>}/>
            <Route path={'/corners/add'} element={<AddCorner/>}/>
            <Route path={'/corners'} element={<CornersList/>}/>
            <Route path={'/corners/:id'} element={<EditCorner/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
