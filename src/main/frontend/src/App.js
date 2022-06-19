import React from "react";
import Header from "./components/UI/header/Header";
import AppRouter from "./routes/AppRouter";
import Footer from "./components/UI/footer/Footer";
import "./styles/normalize.css";
import "./styles/forum.css";

function App() {

  return (
    <div>
      <Header />

      <AppRouter />

      <Footer />
    </div>
  );
}

export default App;
