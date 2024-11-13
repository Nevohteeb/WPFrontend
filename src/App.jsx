import { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import "./App.css";
// import customizer hook:
import useCustomizer from "./hooks/useCustomizer";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Links from "./components/Links";

const App = () => {
  const {bgColor, fontFamily, navColor} = useCustomizer();

  useEffect(() => {
    // Apply the bgColor to the body:
    document.body.style.backgroundColor = `#${bgColor}`

    // Apply the font to the body
    if (fontFamily === 'Arial') {
      document.body.style.fontFamily = `'Arial', sans-serif`;
    }
    if (fontFamily === 'Roboto') {
      document.body.style.fontFamily = `'Roboto', sans-serif`;
    }
    if (fontFamily === 'Poppins') {
      document.body.style.fontFamily = `'Poppins', sans-serif`;
    }
    if (fontFamily === 'DotGothic') {
      document.body.style.fontFamily = `'DotGothic16', sans-serif`;
    }

    document.querySelector('nav').style.backgroundColor = navColor;
    document.querySelector('footer').style.backgroundColor = navColor;

  }, [bgColor, fontFamily, navColor])

  return (
    <HashRouter>
      <Navbar/>
      <Links/>
      <Footer/>
    </HashRouter>
  );
};

export default App;
