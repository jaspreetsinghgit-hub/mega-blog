import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService
      .logout()
      .then(() => dispatch(logout()))
      .catch((err) =>
        console.log("Error in logoutHandler's authServicer", err),
      );
  };

  return (
    <button
      onClick={logoutHandler}
      className="inline-flex cursor-pointer items-center rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition duration-200 hover:bg-slate-700 sm:px-4"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
