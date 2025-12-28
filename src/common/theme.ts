import { createTheme } from "@mui/material";
import { ThemeMode } from "../app/app-reducer.ts";

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#087EA4",
      },
    },
  });
};
