import { NextPage } from "next/types";
import Link from "next/link";
import Router from "next/router";

import React, { useState } from "react";

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
          {theme === "dark" ? "светлая" : "темная"}
        </button>
      </nav>
      <style jsx>{`
        nav {
          background-color: var(--grey-10);
        }
        nav a {
          color: ${textColor};
        }
      `}</style>
    </header>
  );
};

export default Header;
