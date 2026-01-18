import {
  createAppSlice,
  handleServerAppError,
  handleServerNetworkError,
} from "@/common/common/utils";
import { authApi } from "@/features/auth/api/authApi.ts";
import { LoginInputs } from "@/features/auth/lib/schemas";
import { setStatusAC } from "@/app/app-slice.ts";
import { ResultCode } from "@/common/enums/enums.ts";
import { AUTH_TOKEN } from "@/common/constants";
import { clearDataAC } from "@/common/actions";

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    nikeName: null as null | string,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectNikeName: (state) => state.nikeName,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: LoginInputs, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setStatusAC({ status: "loading" }));
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const res = await authApi.login(data);
          if (res.data.resultCode === ResultCode.Error) {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
          dispatch(setStatusAC({ status: "succeeded" }));
          localStorage.setItem(AUTH_TOKEN, res.data.data.token);
          return { isLoggedIn: true };
        } catch (e) {
          handleServerNetworkError(e, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
      },
    ),
    logoutTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setStatusAC({ status: "loading" }));
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const res = await authApi.logout();
          if (res.data.resultCode === ResultCode.Error) {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
          dispatch(setStatusAC({ status: "succeeded" }));
          localStorage.removeItem(AUTH_TOKEN);
          dispatch(clearDataAC());
          return { isLoggedIn: false };
        } catch (e) {
          handleServerNetworkError(e, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
      },
    ),
    initializeAppTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setStatusAC({ status: "loading" }));
          const res = await authApi.me();
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setStatusAC({ status: "succeeded" }));
            return { isLoggedIn: true, nikeName: res.data.data.login };
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error: any) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
          state.nikeName = action.payload.nikeName;
        },
      },
    ),
  }),
});

export const { selectIsLoggedIn, selectNikeName } = authSlice.selectors;
export const { loginTC, logoutTC, initializeAppTC } = authSlice.actions;
export const authReducer = authSlice.reducer;
