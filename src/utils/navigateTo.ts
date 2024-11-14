import { useLocation, useNavigate } from "react-router-dom";
import { useSessionStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";

export function useUtils() {
  const [activeDiv, setActiveDiv] = useSessionStorage("page", "/");
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (divLink: string) => {
    setActiveDiv(divLink);
    navigate(divLink);
  };

  useEffect(() => {
    setActiveDiv(location.pathname);
  }, [location.pathname]);

  const goBack = () => {
    navigate(-1);
  };

  return {
    goBack,
    navigateTo,
    activeDiv,
  };
}
