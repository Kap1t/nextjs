import { NextPage } from "next/types";

import React, { useState } from "react";

const Footer: NextPage = () => {
  const [theme, setTheme] = useState("dark");

  return (
    <footer className="footer">
      @ copyright 2022
      <style jsx>{`
        footer {
          margin-top: 50px;
          width: 100%;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--header-background);
          // border-bottom: 2px solid var(--border);
          position: relative;
        }
        footer:before {
          position: absolute;
          top: -1px;
          left: 10%;
          width: 80%;
          border-top: 1px solid var(--border);
          content: "";
        }
      `}</style>
    </footer>
  );
};

export default Footer;
