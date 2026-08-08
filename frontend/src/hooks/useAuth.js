import { useSelector } from "react-redux";

export default function useAuth() {
  const auth = useSelector((state) => state.auth);

  return {
    user: auth.user,

    token: auth.token,

    role: auth.user?.role || null,

    isAuthenticated: auth.isAuthenticated,

    isAdmin: auth.user?.role === "admin",

    isTeacher: auth.user?.role === "teacher",

    isStudent: auth.user?.role === "student",

    isParent: auth.user?.role === "parent",
  };
}