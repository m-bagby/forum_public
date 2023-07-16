import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import PostsFeed from "./components/post/PostsFeed.jsx";
import PostPage from "./components/post/PostPage.jsx";
import Page404 from "./components/Page404";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<PostsFeed/>}/>
                <Route path={"/post/:id"} element={<PostPage/>}/>
                <Route path={"*"} element={<Page404/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;