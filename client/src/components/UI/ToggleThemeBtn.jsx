import { useEffect, useState } from "react";
import DarkThemeIcon from "../Icons/DarkThemeIcon";
import LightThemeIcon from "../Icons/LightThemeIcon";
import toggleTheme from "../../utils/toggle-theme";

const ToggleThemeBtn = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleClick = () => {
    toggleTheme();
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  let content;
  if (theme === "light") {
    content = <DarkThemeIcon />;
  } else if (theme === "dark") {
    content = <LightThemeIcon />;
  }

  return (
    <button aria-label="switch theme" onClick={handleClick}>
      {content}
    </button>
  );
};

export default ToggleThemeBtn;
