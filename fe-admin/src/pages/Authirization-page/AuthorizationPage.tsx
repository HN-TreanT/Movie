import EditInfo from "../edit-page/editInfo";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { RouterLinks } from "../../const";
import { useNavigate } from "react-router-dom";
export const AuthorizationPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    // <Navigate to={RouterLinks.EDIT_PAGE} />;
    navigate(RouterLinks.EDIT_PAGE);
  };
  return (
    <>
      <div>App page</div>
      <button onClick={handleClick}>edit</button>
      <Outlet />
    </>
  );
};
