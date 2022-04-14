import { NextPage } from "next/types";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import { MdLightMode, MdOutlineModeNight } from "react-icons/md";
import { IoBook } from "react-icons/io5";

const Header: NextPage = () => {
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
    <header className=".header">
      <nav>
        {/* <Link href={"/javascript/post/arrays"}>
          <a> Массивы</a>
        </Link>
        <Link href={"/javascript/post/objects"}>
          <a>Объекты</a>
        </Link> */}
        <Link href={"/"}>
          <a style={{ marginTop: "2px" }}>
            learn <IoBook size={"35px"} style={{ verticalAlign: "middle" }} /> {" web"}
          </a>
        </Link>
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
        </button>
      </nav>
      <style jsx>{`
        header {
        }
        nav {
          width: 100%;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--header-background);
          // border-bottom: 2px solid var(--border);
          position: relative;
        }
        nav:before {
          position: absolute;
          top: 65px;
          left: 10%;
          width: 80%;
          border-top: 1px solid var(--border);
          content: "";
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
