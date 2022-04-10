import { NextPage } from "next/types";
import Link from "next/link";
import Router from "next/router";

import React from "react";

const textColor = "var(--grey-120)";

const Header: NextPage = () => {
  return (
    <header>
      <nav>
        <Link href={"/post/1"}>1</Link>
        <Link href={"/post/2"}>2</Link>
        <button
          onClick={() => {
            Router.push("/post/3");
          }}
        >
          3
        </button>
        <button
          onClick={() => {
            document.body.setAttribute("light", "");
          }}
        >
          Светлая
        </button>
        <button
          onClick={() => {
            document.body.removeAttribute("light");
          }}
        >
          Темная
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
