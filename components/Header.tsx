import { NextPage } from "next/types";
import Link from "next/link";
// import Router from "next/router";

import React, { useState } from "react";
import { MdLightMode, MdNightlight } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";

const Header: NextPage = () => {
  const [theme, setTheme] = useState("dark");

  return (
    <header>
      <nav>
        <Link href={"/javascript/post/arrays"}>Массивы</Link>
        <Link href={"/javascript/post/objects"}>Объекты</Link>
        <Link href={"/"}>
          <a>
            <IoHomeSharp size={"35px"} />
          </a>
        </Link>
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
            <MdNightlight size="25px" color="#ffe600" style={{ transform: "rotateZ(-17deg)" }} />
          )}
        </button>
      </nav>
      <style jsx>{`
        nav {
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--grey-10);
        }
        .themeBtn {
          background-color: transparent;
          border: none;
          cursor: pointer;
          height: 40px;
          width: 40px;
        }
      `}</style>
    </header>
  );
};

export default Header;
