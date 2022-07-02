import { NextPage } from "next";
import { useState } from "react";
import styles from "./SideBar.module.scss";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import useActiveSideBar from "../../Hooks/useActiveSideBar";
import useShowSideBar from "../../Hooks/useShowSideBar";

const getAnchors = (str: string) => {
  const arrOfLinks = [];
  let startTarget = "## ";
  let endTarget = "\n";
  let pos = 0;
  for (let i = 0; i < 51; i++) {
    let startFoundPos = str.indexOf(startTarget, pos);
    if (startFoundPos === -1) break;
    if (str[startFoundPos - 1] === "#") {
      pos = startFoundPos + 4;
      continue;
    }

    let endFoundPos = str.indexOf(endTarget, startFoundPos);
    if (endFoundPos === -1) break;
    arrOfLinks.push({
      name: str.slice(startFoundPos + 3, endFoundPos + 1),
      anchor: `anchor${startFoundPos}`,
    });

    pos = startFoundPos + 1;
  }
  return arrOfLinks;
};

interface Props {
  article: {
    _id: string;
    ref: string;
    name?: string;
    content: string;
    updatedAt: string;
  };
}
export const SideBar: NextPage<Props> = ({ article }) => {
  const [show, setShow] = useState(false);
  const [links] = useState(getAnchors(article.content));
  useActiveSideBar();
  useShowSideBar(setShow);

  return (
    <>
      <div className={`${styles.sideBar} ${show && styles.activeSideBar}`}>
        <nav>
          <ul>
            <li style={{ color: "#868686" }}>Раздел</li>
            <li style={{ color: "#868686" }}>Навигация по уроку</li>
            {links.map((link) => (
              <li key={link.anchor}>
                <a
                  className="sideBarLink"
                  href={"#" + link.anchor}
                  onClick={(e: any) => {
                    e.preventDefault();
                    document.querySelector(e?.target.getAttribute("href")).scrollIntoView({
                      behavior: "smooth",
                    });
                    if (window.innerWidth < 700) {
                      setShow(false);
                    }
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <button
            className={styles.showBtn}
            style={{ right: `${show ? "0px" : "-60px"}` }}
            onClick={() => {
              if (window.innerWidth < 700) {
                setShow(!show);
              }

              if (window.innerWidth > 700) {
                if (show) {
                  localStorage.setItem("showBig", "false");
                  setShow(false);
                  document.body.removeAttribute("showSidebar");
                } else {
                  localStorage.removeItem("showBig");
                  setShow(true);
                  document.body.setAttribute("showSidebar", "");
                }
              }
            }}
          >
            {show ? (
              <BsArrowLeft size="40px" color="white" />
            ) : (
              <BsArrowRight size="40px" color="var(--text)" />
            )}
          </button>
        </nav>
      </div>
    </>
  );
};
