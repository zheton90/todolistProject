import { CssBaseline, ThemeProvider } from "@mui/material";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { selectTemeMode } from "@/app/app-selectors.ts";
import { getTheme } from "@/common/theme.ts";
import { Header } from "@/common/components/Header/Header.tsx";
import { Main } from "@/app/Main.tsx";

export const App = () => {
  const themeMode = useAppSelector(selectTemeMode);

  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  );
};
