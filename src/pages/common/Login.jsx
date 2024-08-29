import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ErrorMessage, PasswordInput } from "../../components";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { CgSpinner } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const handleNavigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [showOTPInput, setShowOTPInput] = useState(false);

  const [formData, setFormData] = useState({
    userId: "CROWN-",
    password: "",
    otp: "",
  });

  const [errors, setErrors] = useState({
    userId: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    userId: "",
    password: "",
  });

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateInput(name, formData[name]);
  };

  const validateInput = (name, value) => {
    let error = "";

    switch (name) {
      case "userId":
        error = value.trim() === "" ? `User ID is required` : "";
        break;
      case "password":
        error = value ? "" : "Password is required";
        break;

      case "otp":
        error = value ? "" : "OTP is required";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const [loadingStates, setLoadingStates] = useState({
    isSignInLoading: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (touched[name]) {
      validateInput(name, value);
    }
  };

  const changeLoadingStates = (name, value) => {
    setLoadingStates((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log("first");
    try {
      // if (!showOTPInput) {
      //   changeLoadingStates("isSignInLoading", true);
      //   const response = await authService.sendLoginOTP({
      //     userId: `${formData.userId}`,
      //     password: formData.password,
      //   });
      //   if (response?.data?.success) {
      //     changeLoadingStates("isSignInLoading", false);
      //     // updateUser({
      //     //   user: response?.data?.data,
      //     //   token: response?.data?.token,
      //     // });
      //     // handleNavigate("/dashboard");
      //     setShowOTPInput(true);
      //   }
      // } else {
      changeLoadingStates("isSignInLoading", true);
      const response = await authService.loginUser({
        userId: `${formData.userId}`,
        password: formData.password,
        // otp: formData.otp,
      });
      console.log(response);
      if (response?.data?.success) {
        changeLoadingStates("isSignInLoading", false);
        updateUser({
          user: response?.data?.data,
          token: response?.data?.token,
        });
        handleNavigate("/dashboard");
      }
      // }
    } catch (error) {
      console.log(error);
      changeLoadingStates("isSignInLoading", false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const validationFilteredStates = showOTPInput
    ? Object.keys(formData)
    : Object.keys({ userId: formData.userId, password: formData.password });

  const isButtonDisabled = useMemo(
    () =>
      Object.values(errors).some((error) => error !== "") ||
      validationFilteredStates.filter((el) => formData[el] === "")?.length > 0,
    [errors, formData]
  );

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="w-full flex flex-col md:flex-row h-full bg-custom-eclipse">
      <div className="mx-auto w-full md:w-1/2 text-center flex flex-col justify-center px-6 md:px-32 mt-4 md:mt-0">
        <div className=" text-center flex flex-row justify-center gap-6 mb-12 items-center ">
          <a href="/">
            <img src="/assets/img/logoname.png" className="w-16" />
          </a>
          <a href="/">
            <div className="font-bold text-4xl">Crown Bankers</div>
          </a>
        </div>
        <div className="block rounded-lg py-[50px] text-left px-0 md:px-10">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-y-[10px]">
              <label
                htmlFor="login-email"
                className="text-2xl font-bold leading-[1.6]"
              >
                User ID
              </label>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="rounded-[10px] border border-secondary bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed"
                onBlur={() => handleBlur("userId")}
              />
              <ErrorMessage error={errors.userId} touched={touched.userId} />
            </div>
            {!showOTPInput && (
              <div className="flex flex-col gap-y-[10px]">
                <label
                  htmlFor="login-password"
                  className="text-2xl font-bold leading-[1.6]"
                >
                  Enter Password
                </label>
                <div className="flex flex-column justify-between rounded-[10px] border border-secondary bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    id="login-password"
                    placeholder="............"
                    className="outline-none"
                  />

                  <div
                    className="  flex items-center pr-2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEyeSlash color="#000" size={18} />
                    ) : (
                      <FaEye color="#000" size={18} />
                    )}
                  </div>
                </div>
              </div>
            )}
            {showOTPInput && (
              <div className="flex flex-col gap-y-[10px]">
                <label
                  htmlFor="login-password"
                  className="text-2xl font-bold leading-[1.6]"
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="............"
                  className="rounded-[10px] border border-secondary bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed"
                  required=""
                />
              </div>
            )}
            {/* Form Single Input */}
            <div className="flex flex-wrap justify-between gap-x-10 gap-y-4">
              <Link
                to="/reset-password"
                className="text-lg hover:text-colorOrangyRed"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="button mt-7 block rounded-[50px] border-2 border-white bg-primary py- text-white text-2xl after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white w-full"
          >
            {loadingStates.isSignInLoading && (
              <span className="absolute inset-0 flex items-center justify-center">
                <CgSpinner className="animate-spin" size={20} />
              </span>
            )}
            {!showOTPInput ? "Sign in" : "Verify OTP"}
          </button>

          <div className="mt-10 text-center">
            Don't have an account? &nbsp;
            <Link
              to="/signup"
              className="text-2xl font-semibold hover:text-colorOrangyRed"
            >
              Sign Up here
            </Link>
          </div>
        </div>
      </div>
      <div className="relative w-full md:w-1/2 h-[600px] md:h-screen ">
        {/* Background Image */}
        <img
          src="/assets/LoginBg.png"
          className="w-full h-full"
          alt="Background"
        />

        {/* Overlayed Login Image */}
        <img
          src="/assets/Login.png"
          className="absolute top-0 left-0 w-full h-[80%]"
          alt="Login"
        />
      </div>
      {/* Section Container */}
    </div>
  );
};

export default Login;
