import { useEffect, useState } from "react";

export default function useActiveSideBar() {
  const [check, setCheck] = useState(false);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setCheck(true);
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);
  useEffect(() => {
    if (check === false) return;
    const headings = document.querySelectorAll(".articleLink");
    const links = document.querySelectorAll(".sideBarLink");
    const cb = () => {
      headings.forEach((h2: any, index) => {
        //  h2.getBoundingClientRect().top не работает при деплое на vercel
        const top = h2.offsetTop - window.scrollY;
        if (document.documentElement.scrollHeight - window.innerHeight - window.scrollY <= 20) {
          links.forEach((link) => link.classList.remove("active"));
          links[links.length - 1]?.classList.add("active");
          return;
        }

        if (top < 100 && top >= 0) {
          const activeId = h2.id;
          const activeLink = document.querySelector(`.sideBarLink[href="#${activeId}"]`);

          links.forEach((link) => link.classList.remove("active"));
          activeLink?.classList.add("active");
        }

        if (top >= 100 && top < 250) {
          if (index > 0) {
            const activeLink = links[index - 1];
            if (activeLink) {
              links.forEach((link) => link.classList.remove("active"));

              activeLink?.classList.add("active");
            }
          }
          if (index == 0) {
            links.forEach((link) => link.classList.remove("active"));
          }
        }
      });
    };
    cb();
    document.addEventListener("scroll", cb);

    return () => {
      document.removeEventListener("scroll", cb);
    };
  }, [check]);
}
