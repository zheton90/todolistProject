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
  selectIsLoggedIn,
  selectNikeName,
  selectRequestStatus,
  selectThemeMode,
  setIsLoggedInAC,
} from "@/app/app-slice.ts";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import { getTheme } from "@/common/theme.ts";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { conteinerSx } from "@/common/styles/container.styles.ts";
import { useLogoutMutation } from "@/features/auth/api/authApi.ts";
import { AUTH_TOKEN } from "@/common/constants";
import { clearDataAC } from "@/common/actions";
// import {useMeQuery} from "@/features/auth/api/authApi.ts";

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();
  const theme = getTheme(themeMode);
  const requestStatus = useAppSelector(selectRequestStatus);
  const [logout] = useLogoutMutation();
  const nikeName = useAppSelector(selectNikeName);

  const changeMode = () => {
    dispatch(
      changeThemeModeAC({ themeMode: themeMode === "dark" ? "light" : "dark" }),
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(setIsLoggedInAC({ isLoggedIn: false }));
      localStorage.removeItem(AUTH_TOKEN);
      dispatch(clearDataAC());
    } catch (e) {
      console.log(e);
    }
    // dispatch(logoutTC());
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
