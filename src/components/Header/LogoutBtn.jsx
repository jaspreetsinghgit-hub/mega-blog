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
      className="inline-flex cursor-pointer items-center rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white shadow-md shadow-slate-300/40 transition duration-200 hover:-translate-y-px hover:bg-slate-800 hover:shadow-lg sm:px-4"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
