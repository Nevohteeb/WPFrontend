import { useState, useEffect } from "react";
import axios from "axios";

const useCustomizer = () => {
  const [bgColor, setBgColor] = useState("");
  const [fontFamily, setFontFamily] = useState("");
  const [mobileMenu, setMobileMenu] = useState("");
  const [navColor, setNavColor] = useState("");

  const baseUrl = import.meta.env.VITE_WP_BASEURL;

  useEffect(() => {
    axios.get(`${baseUrl}wp-json/custom-theme/v1/customizer-settings`)
        .then((response) => {
            const {backgroundColor, fontFamily, mobileMenu, navbarColor} = response.data;
            setBgColor(backgroundColor);
            setFontFamily(fontFamily);
            setMobileMenu(mobileMenu);
            setNavColor(navbarColor);
        })
        .catch((error) => {
            console.error('Error fetching customizer settings: ', error)
        })
  }, [baseUrl]);

  return {bgColor, fontFamily, mobileMenu, navColor};
};

export default useCustomizer;
