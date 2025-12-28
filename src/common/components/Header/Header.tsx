import { AppBar, Container, IconButton, Switch, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavButton } from "@/common/components/NavButton/NavButton.ts";
import { changeThemeModeAC } from "@/app/app-reducer.ts";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import { getTheme } from "@/common/theme.ts";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { selectTemeMode } from "@/app/app-selectors.ts";
import { conteinerSx } from "@/common/styles/container.styles.ts";

export const Header = () => {
  const themeMode = useAppSelector(selectTemeMode);

  const dispatch = useAppDispatch();
  const theme = getTheme(themeMode);

  const changeMode = () => {
    dispatch(
      changeThemeModeAC({ themeMode: themeMode === "dark" ? "light" : "dark" }),
    );
  };

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth="lg" sx={conteinerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton>Sign in</NavButton>
            <NavButton>Sign up</NavButton>
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
