import { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./SideBar.module.scss";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { log } from "console";

const getAnchors = (str: string) => {
  const arrOfLinks = [];
  let startTarget = "##";
  let endTarget = "\n";
  let pos = 0;
  for (let i = 0; i < 51; i++) {
    let startFoundPos = str.indexOf(startTarget, pos);
    if (startFoundPos === -1) break;

    let endFoundPos = str.indexOf(endTarget, startFoundPos);
    if (endFoundPos === -1) break;
    //TODO ограничение на длинну
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
  useEffect(() => {
    if (window.innerWidth > 700) {
      if (!(localStorage.getItem("showBig") == "false")) {
        setShow(true);
        document.body.setAttribute("showSidebar", "");
      }
    }

    const handlerOnResize = () => {
      if (window.innerWidth < 700) {
        setShow(false);
      } else {
        if (!(localStorage.getItem("showBig") == "false")) {
          setShow(true);
        }
      }
    };
    window.addEventListener("resize", handlerOnResize);

    return () => {
      window.removeEventListener("resize", handlerOnResize);
    };
  }, []);

  return (
    // <div className={styles.sideBar} style={{ left: show ? "0" : "-300px" }}>
    <>
      {/* <div className={styles.sideBar}> */}
      <div className={`${styles.sideBar} ${show && styles.activeSideBar}`}>
        <nav>
          <ul>
            <li style={{ color: "#868686" }}>Раздел</li>
            <li style={{ color: "#868686" }}>Навигация по уроку</li>
            {links.map((link) => (
              <li key={link.anchor}>
                <a href={"#" + link.anchor}>{link.name}</a>
              </li>
            ))}
          </ul>
          <button
            className={styles.showBtn}
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
              <BsArrowLeft size="40px" color="var(--text)" />
            ) : (
              <BsArrowRight size="40px" color="var(--text)" />
            )}
          </button>
        </nav>
      </div>
    </>
  );
};
