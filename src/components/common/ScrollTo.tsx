import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const rootElement = document.querySelector('#root');
    if (rootElement) {
      rootElement.scrollTo({ top: 0, behavior: 'smooth' }); // #root의 스크롤 이동
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
