import { RootState } from "@/app/store.ts";
import { ThemeMode } from "@/app/app-slice.ts";

export const selectTemeMode = (state: RootState): ThemeMode =>
  state.app.themeMode;
