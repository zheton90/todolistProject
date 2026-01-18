import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@/common/types";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    requestStatus: "idle" as RequestStatus,
    error: null as string | null,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>(
      (state, action) => {
        state.themeMode = action.payload.themeMode;
      },
    ),
    setStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.requestStatus = action.payload.status;
    }),
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error;
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectRequestStatus: (state) => state.requestStatus,
    selectAppError: (state) => state.error,
  },
});

export const { changeThemeModeAC, setStatusAC, setAppErrorAC } =
  appSlice.actions;
export const appReducer = appSlice.reducer;
export const { selectThemeMode, selectRequestStatus, selectAppError } =
  appSlice.selectors;

export type ThemeMode = "dark" | "light";
