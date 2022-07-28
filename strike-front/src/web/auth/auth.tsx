import { createContext, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthModel } from "./authModel";

export const AuthContext = createContext<{
  authData: AuthModel;
  setAuthData: React.Dispatch<React.SetStateAction<AuthModel>>;
}>({ authData: new AuthModel(), setAuthData: () => {} });

export const AuthRoute: React.FC<{ element: JSX.Element }> = ({ ...props }) => {
  const authUser = useContext(AuthContext);
  console.log("auth", authUser);
  const isAuthenticated = authUser.authData; //認証されているかの判定
  if (isAuthenticated) {
    return props.element;
  } else {
    console.log(`ログインしていないユーザーはアクセスできません`);
    return <Navigate to="/login" />;
  }
};
