import { Outlet } from "react-router-dom";
import { RouterLinks } from "../../const";
import { useNavigate } from "react-router-dom";
import useAction from "../../redux/useActions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
export const AuthorizationPage = () => {
  const actions = useAction();
  const dispatch = useDispatch();
  const loginState = useSelector((state: any) => state.state.loginState);
  const [isLogin, setIsLogin] = useState(loginState);
  console.log(isLogin);
  const navigate = useNavigate();
  const handleClick = () => {
    // <Navigate to={RouterLinks.EDIT_PAGE} />;
    navigate(RouterLinks.EDIT_PAGE);
  };
  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
  };
  return (
    <>
      <div>App page</div>
      {isLogin ? <div>Login success</div> : <div>not login</div>}
      <button onClick={handleClick}>edit</button>
      <button onClick={handleLogout}>Logout</button>
      <Outlet />
    </>
  );
};
