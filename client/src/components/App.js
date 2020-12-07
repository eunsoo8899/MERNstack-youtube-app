import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadVideoPage from './views/UploadVideoPage/UploadVideoPage'
import DetailVideoPage from './views/DetailVideoPage/DetailVideoPage'
import SubscriptionPage from './views/SubscriptionPage/SubscriptionPage'

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(UploadVideoPage, true)} />          
          <Route exact path="/video/:videoId" component={Auth(DetailVideoPage, null)} />          
          <Route exact path="/subscription" component={Auth(SubscriptionPage, null)} />          
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}
// <Route></Route>에서 component값을 null,false,true로 줄수 있는데 
// null을 줄 경우 로그인 하나 안하나 접근 가능,
// false를 줄 경우 로그인을 한다면 접근불가,
// true일 경우 로그인 한 유저만 접근 가능

export default App;
