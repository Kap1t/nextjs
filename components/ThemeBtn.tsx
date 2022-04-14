import { NextPage } from "next/types";
import React, { useEffect, useState } from "react";
import { MdLightMode, MdOutlineModeNight } from "react-icons/md";

export const ThemeBtn: NextPage = () => {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    if (localStorage.getItem("theme") === "ligth") {
      document.body.setAttribute("light", "");
      setTheme("light");
    } else {
      document.body.removeAttribute("light");
      setTheme("dark");
    }
  }, []);
  return (
    <button
      className="themeBtn"
      onClick={() => {
        if (theme === "dark") {
          document.body.setAttribute("light", "");
          setTheme("light");
          localStorage.setItem("theme", "ligth");
        }
        if (theme === "light") {
          document.body.removeAttribute("light");
          setTheme("dark");
          localStorage.setItem("theme", "dark");
        }
      }}
    >
      {theme === "dark" ? (
        <MdLightMode size="25px" color="#ffee00" />
      ) : (
        <MdOutlineModeNight size="25px" style={{ transform: "rotateZ(-197deg)" }} />
      )}
      <style jsx>{`
        .themeBtn {
          background-color: transparent;
          border: none;
          cursor: pointer;
          height: 40px;
          width: 40px;
        }
      `}</style>
    </button>
  );
};

export default ThemeBtn;
