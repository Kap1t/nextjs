import { NextPage } from "next/types";
import Link from "next/link";
import ThemeBtn from "./ThemeBtn";
import UserBtn from "./UserBtn";

import { IoBook } from "react-icons/io5";

const Header: NextPage = () => {
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
        <ThemeBtn />
        <UserBtn />
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
      `}</style>
    </header>
  );
};

export default Header;
