import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { getTheme } from "@/common/theme.ts";
import { Header } from "@/common/components/Header/Header.tsx";
import {
  selectThemeMode,
  setIsLoggedInAC,
  setNikeNameAC,
} from "@/app/app-slice.ts";
import { ErrorSnackbar } from "@/common/components";
import { Routing } from "@/common/common/routing";
// import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import { useEffect, useState } from "react";
// import { initializeAppTC } from "@/features/auth/model/auth-slice.ts";
import styles from "./App.module.css";
import { useMeQuery } from "@/features/auth/api/authApi.ts";
import { ResultCode } from "@/common/enums/enums.ts";

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode);
  // const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const { data, isLoading } = useMeQuery();

  const theme = getTheme(themeMode);

  useEffect(() => {
    if (isLoading) return;
    if (data?.resultCode === ResultCode.Success) {
      setIsLoggedInAC({ isLoggedIn: true });
      setNikeNameAC({ name: data.data.login });
    }
    setIsInitialized(true);
  }, [isLoading]);

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  );
};
