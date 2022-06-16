import React from 'react';
import NotFound from "../components/404page/NotFound";
import AboutPage from "../components/aboutPage/AboutPage";
import CreateTopicPage from "../components/createTopicPage/CreateTopicPage";
import MainPage from "../components/indexPage/MainPage";
import SectionPage from "../components/sectionPage/SectionPage";
import SettingsPage from "../components/settingPage/SettingsPage";
import TopicPage from "../components/topicPage/TopicPage";
import UserPage from "../components/userPage/UserPage";
import LoginPage from "../components/loginPage/LoginPage";
import RegisterPage from "../components/registerPage/RegisterPage";
import LogoutPage from "../components/logoutPage/LogoutPage";
import AdminPage from "../components/adminPage/AdminPage";
import SearchPage from "../components/searchPage/SearchPage";

export const AppRoutes = [
  { path: "/", element: <MainPage />, exact: true },
  { path: "/signin", element: <LoginPage />, exact: true },
  { path: "/register", element: <RegisterPage />, exact: true },
  { path: "/logout", element: <LogoutPage />, exact: true },
  { path: "/create", element: <CreateTopicPage />, exact: true },
  { path: "/about", element: <AboutPage />, exact: true },
  { path: "/search", element: <SearchPage />, exact: true},
  { path: "/topic/:topicID", element: <TopicPage />, exact: true },
  { path: "/section/:sectionID", element: <SectionPage />, exact: true },
  { path: "/user/:userID", element: <UserPage />, exact: true },
  { path: "/settings", element: <SettingsPage />, exact: true },
  { path: "/admin", element: <AdminPage />, exact: true},
  { path: "*", element: <NotFound />, exact: true },
];
