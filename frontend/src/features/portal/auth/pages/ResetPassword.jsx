import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  CheckCircle,
} from "lucide-react";

import { useResetPasswordMutation } from "../../../../redux/api/authApi";

export default function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [resetPassword, { isLoading }] =
    useResetPasswordMutation();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password =
        "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !==
        formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response =
        await resetPassword({
          token,
          password: formData.password,
        }).unwrap();

      setSuccess(true);

      setTimeout(() => {
        navigate("/portal/login");
      }, 2500);

    } catch (error) {
      setErrors({
        server:
          error?.data?.message ||
          "Unable to reset password.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10 font-[Candara]">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">

          <div className="w-16 h-16 rounded-full bg-blue-100 mx-auto flex items-center justify-center">

            <Lock className="text-[#0B3D91]" size={28} />

          </div>

          <h1 className="text-3xl font-bold mt-4 text-gray-800">

            Reset Password

          </h1>

          <p className="text-gray-500 mt-2">

            Enter your new password below.

          </p>

        </div>

        {success ? (

          <div className="text-center">

            <CheckCircle
              size={60}
              className="mx-auto text-green-600 mb-4"
            />

            <h2 className="text-2xl font-bold text-green-700">

              Password Updated

            </h2>

            <p className="mt-2 text-gray-600">

              Redirecting to login...

            </p>

          </div>

        ) : (

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {errors.server && (

              <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">

                {errors.server}

              </div>

            )}

            {/* Password */}

            <div>

              <label className="block mb-2 font-semibold">

                New Password

              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  placeholder="********"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-3.5"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              {errors.password && (

                <p className="text-red-500 text-sm mt-1">

                  {errors.password}

                </p>

              )}

            </div>

            {/* Confirm */}

            <div>

              <label className="block mb-2 font-semibold">

                Confirm Password

              </label>

              <div className="relative">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  placeholder="********"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-3.5"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              {errors.confirmPassword && (

                <p className="text-red-500 text-sm mt-1">

                  {errors.confirmPassword}

                </p>

              )}

            </div>

            <button
              disabled={isLoading}
              className="w-full bg-[#0B3D91] hover:bg-[#082b66] transition text-white py-3 rounded-lg font-semibold disabled:opacity-60"
            >

              {isLoading
                ? "Updating..."
                : "Reset Password"}

            </button>

            <div className="text-center">

              <Link
                to="/portal/login"
                className="text-[#0B3D91] hover:underline font-medium"
              >

                Back to Login

              </Link>

            </div>

          </form>

        )}

      </div>

    </div>
  );
}