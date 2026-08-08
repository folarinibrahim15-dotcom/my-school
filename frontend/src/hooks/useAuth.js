import { useSelector } from "react-redux";

export default function useAuth() {
    const auth = useSelector((state) => state.auth);

    const user = auth?.user || null;
    const token = auth?.token || null;

    const role = String(user?.role || "")
        .trim()
        .toLowerCase();

    return {
        user,

        token,

        role: role || null,

        isAuthenticated: Boolean(
            auth?.isAuthenticated && user
        ),

        isAdmin: role === "admin",

        isTeacher: role === "teacher",

        isStudent: role === "student",

        isParent: role === "parent",
    };
}
