import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";
import Header from "./components/Header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import authService from "./service/authService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./pages/MainPage";
import Footer from "./components/Footer";

function App() {
  const [isExpire, setIsExpire] = useState(false);
  useEffect(() => {
    setIsExpire(authService.checkTokenExpiration);
  }, [isExpire]);
  return (
    <div>
      <Header />
      <BrowserRouter>
        <ToastContainer />
        <MainPage />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
