import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
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
      if (!showOTPInput) {
        changeLoadingStates("isSignInLoading", true);
        const response = await authService.sendLoginOTP({
          userId: `${formData.userId}`,
          password: formData.password,
        });
        if (response?.data?.success) {
          changeLoadingStates("isSignInLoading", false);
          // updateUser({
          //   user: response?.data?.data,
          //   token: response?.data?.token,
          // });
          // handleNavigate("/dashboard");
          setShowOTPInput(true);
        }
      } else {
        changeLoadingStates("isSignInLoading", true);
        const response = await authService.loginUser({
          userId: `${formData.userId}`,
          password: formData.password,
          otp: formData.otp,
        });
        if (response?.data?.success) {
          changeLoadingStates("isSignInLoading", false);
          updateUser({
            user: response?.data?.data,
            token: response?.data?.token,
          });
          handleNavigate("/dashboard");
        }
      }
    } catch (error) {
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
    <>
      <main className="main-wrapper relative overflow-hidden">
        {/*...::: Login Section Start :::... */}
        <section id="login-section">
          {/* Section Spacer */}
          <div className="py-40 pt-36 xl:pb-[200px] xl:pt-[180px]">
            {/* Section Container */}
            <div className="global-container">
              <div className="mx-auto max-w-[910px] text-center">
                <h1 className="mb-[50px]">Welcome back</h1>
                <div className="block rounded-lg bg-white px-[30px] py-[50px] text-left shadow-[0_4px_60px_0_rgba(0,0,0,0.1)] sm:px-10">
                  {/* Login Form */}
                  {/* Form Group */}
                  <div className="grid grid-cols-1 gap-6">
                    {/* Form Single Input */}
                    <div className="flex flex-col gap-y-[10px]">
                      <label
                        htmlFor="login-email"
                        className="text-lg font-bold leading-[1.6]"
                      >
                        User ID
                      </label>
                      <input
                        type="text"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        className="rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed"
                        onBlur={() => handleBlur("userId")}
                      />
                      <ErrorMessage
                        error={errors.userId}
                        touched={touched.userId}
                      />
                    </div>
                    {/* Form Single Input */}
                    {/* Form Single Input */}
                    {!showOTPInput && (
                      <div className="flex flex-col gap-y-[10px]">
                        <label
                          htmlFor="login-password"
                          className="text-lg font-bold leading-[1.6]"
                        >
                          Enter Password
                        </label>
                        <div className="flex flex-column justify-between rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed">
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
                          className="text-lg font-bold leading-[1.6]"
                        >
                          Enter OTP
                        </label>
                        <input
                          type="text"
                          name="otp"
                          value={formData.otp}
                          onChange={handleChange}
                          placeholder="............"
                          className="rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed"
                          required=""
                        />
                      </div>
                    )}
                    {/* Form Single Input */}
                    <div className="flex flex-wrap justify-between gap-x-10 gap-y-4">
                      {/* Form Single Input */}
                      <div className="flex gap-x-8 gap-y-[10px]">
                        <input
                          type="checkbox"
                          className="relative appearance-none text-base after:absolute after:left-0 after:top-[6px] after:h-4 after:w-4 after:rounded-[3px] after:border after:border-[#7F8995] after:bg-white after:text-white after:transition-all after:delay-300 checked:after:border-colorOrangyRed checked:after:bg-colorOrangyRed checked:after:bg-[url('/assets/img/th-1/icon-white-checkmark-filled.svg')]"
                          name="login-check"
                          id="login-check"
                          required=""
                        />
                        <label
                          htmlFor="login-check"
                          className="text-base leading-[1.6]"
                        >
                          Remember me
                        </label>
                      </div>
                      {/* Form Single Input */}
                      <Link
                        to="/reset-password"
                        className="text-base hover:text-colorOrangyRed"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="button mt-7 block rounded-[50px] border-2 border-black bg-black py-4 text-white after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white"
                  >
                    {loadingStates.isSignInLoading && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <CgSpinner className="animate-spin" size={20} />
                      </span>
                    )}
                    {!showOTPInput ? "Sign in" : "Verify OTP"}
                  </button>
                  {/* Form Group */}
                  {/* Login Form */}
                  {/* <div className="relative z-[1] mb-14 mt-9 text-center font-bold before:absolute before:left-0 before:top-1/2 before:-z-[1] before:h-[1px] before:w-full before:-translate-y-1/2 before:bg-[#EAEDF0]">
                    <span className="inline-block bg-white px-6">Or</span>
                  </div> */}
                  {/* API login */}
                  {/* <div className="flex flex-col gap-y-6">
                    <a className="button flex w-full justify-center gap-x-4 rounded-[50px] border-2 border-[#EAEDF0] bg-white py-4 hover:bg-slate-200 cursor-pointer">
                      <span className="hidden h-6 w-6 sm:inline-block">
                        <img
                          src="assets/img/th-1/flat-color-icons-google.svg"
                          alt="flat-color-icons-google"
                          width={24}
                          height={24}
                        />
                      </span>
                      Signup with Google
                    </a>
                    <a className="button flex w-full justify-center gap-x-4 rounded-[50px] border-2 border-[#EAEDF0] bg-white py-4 hover:bg-slate-200 cursor-pointer">
                      <span className="hidden h-6 w-6 sm:inline-block">
                        <img
                          src="assets/img/th-1/flat-color-icon-facebook.svg"
                          alt="flat-color-icon-facebook"
                          width={24}
                          height={24}
                        />
                      </span>
                      Signup with Facebook
                    </a>
                  </div> */}
                  {/* API login */}
                  <div className="mt-10 text-center">
                    Don't have an account? &nbsp;
                    <Link
                      to="/signup"
                      className="text-base font-semibold hover:text-colorOrangyRed"
                    >
                      Sign Up here
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
        </section>
        {/*...::: Login Section End :::... */}
      </main>
    </>
  );
};

export default Login;
