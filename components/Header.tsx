import { NextPage } from "next/types";
import Link from "next/link";
import Router from "next/router";

import React, { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const textColor = "var(--grey-120)";

const Header: NextPage = () => {
  const [theme, setTheme] = useState("dark");
  return (
    <header>
      <nav>
        <Link href={"/post/arrays"}>Массивы</Link>
        <Link href={"/post/objects"}>Объекты</Link>
        <button
          onClick={() => {
            Router.push("/post/3");
          }}
        >
          3
        </button>
        <button
          className="themeBtn"
          onClick={() => {
            if (theme === "dark") {
              document.body.setAttribute("light", "");
              setTheme("light");
            }
            if (theme === "light") {
              document.body.removeAttribute("light");
              setTheme("dark");
            }
          }}
        >
          {theme === "dark" ? (
            <MdLightMode size="25px" color="#ffe600" />
          ) : (
            <MdDarkMode size="25px" />
          )}
        </button>
      </nav>
      <style jsx>{`
        nav {
          background-color: var(--grey-10);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        nav a {
          color: ${textColor};
        }
        .themeBtn {
          background-color: transparent;
          border: none;
          cursor: pointer;
          height: 50px;
          width: 50px;
        }
      `}</style>
    </header>
  );
};

export default Header;
