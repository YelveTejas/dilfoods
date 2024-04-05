import { useColorMode } from "@chakra-ui/react";
import { createContext } from "react";

export const themeContext = createContext();

 const ThemeProvider = ({ children }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isdark = colorMode === "dark";

  return( 
  <themeContext.Provider value={{}}>
    {children}
    </themeContext.Provider>
  )
};

export default ThemeProvider
