
import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkMode from "../Component/useDarkMode";

export default function Switcher() {
    const [colorTheme, setTheme] = useDarkMode();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );
    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
        if (colorTheme === "dark") {
            document.body.style.backgroundColor="#172a48ed"
        }
        else{
            document.body.style.backgroundColor="#ffffff"
        }
    };
    return (
        <>
            <DarkModeSwitch
                checked={darkSide }
                onChange={toggleDarkMode}
                size={30}
            />
        </>
    );
}
