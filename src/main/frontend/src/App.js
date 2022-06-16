import React from "react";
import Header from "./components/UI/header/Header";
import AppRouter from "./routes/AppRouter";
import Footer from "./components/UI/footer/Footer";
import "./styles/normalize.css";
import "./styles/forum.css";

function App() {

  if (Date.now() > new Date(localStorage.getItem("tokenExpirationDate"))) {
    localStorage.removeItem("jwt");
    localStorage.removeItem("isAuth");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("tokenExpirationDate");
  }

  return (
    <div>
      <Header />

      <AppRouter />

      <Footer />
    </div>
  );
}

export default App;
