import { NextPage } from "next/types";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import { mainContext } from "../Context/ContextWrapper";

export const UserBtn: NextPage = () => {
  const context = useContext(mainContext);
  const isAuth = context.user.isAuth;
  console.log(context);

  return (
    <>
      {isAuth === false && (
        <Link href={"/auth/signup"}>
          <a href="#" className="userBtn">
            <FaUserAlt size="23px" color="var(--text)" />
          </a>
        </Link>
      )}
      {isAuth === true && (
        <Link href={"/user"}>
          <a href="#" className="userBtn">
            <FaUserAlt size="23px" color="var(--text)" />
          </a>
        </Link>
      )}

      <style jsx>{`
        .userBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          border: none;
          cursor: pointer;
          height: 40px;
          width: 40px;
        }
      `}</style>
    </>
  );
};

export default UserBtn;
