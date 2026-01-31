import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "@/common/types";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    requestStatus: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
    nikeName: null as null | string,
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
    setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>(
      (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      },
    ),
    setNikeNameAC: create.reducer<{ name: string | null }>((state, action) => {
      state.nikeName = action.payload.name;
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectRequestStatus: (state) => state.requestStatus,
    selectAppError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectNikeName: (state) => state.nikeName,
  },
});

export const {
  changeThemeModeAC,
  setStatusAC,
  setAppErrorAC,
  setIsLoggedInAC,
  setNikeNameAC,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
export const {
  selectNikeName,
  selectThemeMode,
  selectRequestStatus,
  selectAppError,
  selectIsLoggedIn,
} = appSlice.selectors;

export type ThemeMode = "dark" | "light";
