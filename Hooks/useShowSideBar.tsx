import { useEffect } from "react";

type SetShow = (show: boolean) => void;

export default function useShowSideBar(setShow: SetShow) {
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
  }, [setShow]);
}
