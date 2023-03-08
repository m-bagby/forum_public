import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import PostsFeed from "./components/post/PostsFeed.jsx";
import PostPage from "./components/post/PostPage.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<PostsFeed/>}/>
        <Route path={"/post/:id"} element={<PostPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;