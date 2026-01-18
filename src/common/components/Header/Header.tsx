import {
  AppBar,
  Container,
  IconButton,
  LinearProgress,
  Switch,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavButton } from "@/common/components/NavButton/NavButton.ts";
import {
  changeThemeModeAC,
  selectRequestStatus,
  selectThemeMode,
} from "@/app/app-slice.ts";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import { getTheme } from "@/common/theme.ts";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { conteinerSx } from "@/common/styles/container.styles.ts";
import {
  logoutTC,
  selectIsLoggedIn,
  selectNikeName,
} from "@/features/auth/model/auth-slice.ts";

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();
  const theme = getTheme(themeMode);
  const requestStatus = useAppSelector(selectRequestStatus);
  const nikeName = useAppSelector(selectNikeName);

  const changeMode = () => {
    dispatch(
      changeThemeModeAC({ themeMode: themeMode === "dark" ? "light" : "dark" }),
    );
  };

  const handleLogout = () => {
    dispatch(logoutTC());
  };

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth="lg" sx={conteinerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div style={{ display: "flex", alignItems: "center" }}>
            {isLoggedIn && <span>{nikeName}</span>}
            {isLoggedIn && (
              <NavButton onClick={handleLogout}>Sign out</NavButton>
            )}

            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {requestStatus == "loading" && <LinearProgress />}
    </AppBar>
  );
};
