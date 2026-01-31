import { Main } from "@/app/Main";
import { Route, Routes } from "react-router";
import { Login } from "@/features/auth/ui/Login/Login.tsx";
import { PageNotFound } from "@/common/components/PageNoFound/PageNotFound.tsx";
import { ProtectedRoute } from "@/common/components/ProtectedRoute/ProtectedRoute.tsx";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { selectIsLoggedIn } from "@/app/app-slice.ts";

export const Path = {
  Main: "/",
  Login: "login",
  NotFound: "*",
} as const;

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <Routes>
      <Route
        path={Path.Main}
        element={
          <ProtectedRoute isAllowed={isLoggedIn}>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route
        path={Path.Login}
        element={
          <ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main}>
            <Login />
          </ProtectedRoute>
        }
      />
      {/*<Route path={Path.Login} element={<Login />} />*/}
      {/*<Route path={Path.Main} element={<Main />} />*/}
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  );
};
