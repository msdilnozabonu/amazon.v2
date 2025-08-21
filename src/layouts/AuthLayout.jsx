import { Outlet, ScrollRestoration } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="">
      <div className="">
        <Outlet />
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default AuthLayout;
