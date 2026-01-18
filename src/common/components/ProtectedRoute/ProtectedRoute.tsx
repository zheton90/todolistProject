import { Path } from "@/common/common/routing";
import { Navigate } from "react-router";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isAllowed: boolean;
  redirectPath?: string;
};

export const ProtectedRoute = ({
  children,
  isAllowed,
  redirectPath = Path.Login,
}: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />;
  }
  return children;
};
