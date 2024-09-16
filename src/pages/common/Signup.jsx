import { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import countryList from "react-select-country-list";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../constants/baseURL";
import authService from "../../services/authService";
import { ErrorMessage, Select } from "../../components";
import { CgSpinner } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
const Signup = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    sponsorId: "",
    position: "left",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };
  const paramSponsorId = searchParams.get("sponsorId");
  const paramPosition = searchParams.get("position");

  const [formData, setFormData] = useState({
    hasSponsor: false,
    position: "left",
    sponsorId: "CROWN-",
    sponsorName: "",
    firstName: "",
    country: null,
    phoneNumber: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    // withdrawal_wallet: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    country: "",
    // phoneNumber: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    acceptTerms: "",
    // withdrawal_wallet: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    country: false,
    // phoneNumber: false,
    email: false,
    confirmEmail: false,
    password: false,
    confirmPassword: false,
    acceptTerms: false,
    // withdrawal_wallet: "",
  });

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateInput(name, formData[name]);
  };

  const validateInput = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        error = value.trim() === "" ? `${name} is required` : "";
        break;
      case "country":
        console.log(value);
        error = value ? "" : "Please select a country";
        break;
      case "withdrawal_wallet":
        error = value ? "" : "Please enter the withdrawal wallet";
        break;
      // case "withdrawal_wallet":
      //   error = value ? "" : "Please enter the withdrawal wallet";
      //   break;
      // case "phoneNumber":
      //   error = /^\d{10,15}$/.test(value) ? "" : "Invalid phone number";
      //   break;
      case "email":
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "confirmEmail":
        error = value === formData.email ? "" : "Emails do not match";
        break;
      case "password":
        error =
          value.length >= 3 ? "" : "Password must be at least 3 characters";
        break;
      case "confirmPassword":
        error = value === formData.password ? "" : "Passwords do not match";
        break;
      case "acceptTerms":
        error = formData.acceptTerms
          ? ""
          : "You must accept the terms and conditions";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const [loadingStates, setLoadingStates] = useState({
    isSignUpLoading: false,
  });

  const handleRadioChange = (e) => {
    const { name } = e.target;
    setFormData({
      ...formData,
      [name]: !formData[name],
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: !prev[name] }));
    validateInput(name, checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateInput(name, value);
    }
  };

  const options = useMemo(() => countryList().getData(), []);

  const handleNavigate = useNavigate();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid #000",
      borderRadius: "8px",
      padding: "1px",
    }),
    input: (provided) => ({
      ...provided,
      color: "#000 !important",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      color: "#000",
    }),
  };

  useEffect(() => {
    if (formData.sponsorId.length == 12) {
      fetchSponsorName(formData.sponsorId);
    }
  }, [formData.sponsorId]);

  const fetchSponsorName = async (id) => {
    try {
      const { data } = await axios.get(baseURL + "/users/name/" + id);
      if (data?.success) {
        setFormData((prev) => ({ ...prev, sponsorName: data?.data?.name }));
      }
    } catch (error) {
      setFormData((prev) => ({ ...prev, sponsorName: "CROWN" }));
    }
  };

  const changeLoadingStates = (name, value) => {
    setLoadingStates((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      changeLoadingStates("isSignUpLoading", true);
      const response = await authService.signUpUser({
        ...formData,
        referrer_id: formData.sponsorId
          ? `${formData.sponsorId}`
          : "CROWN-100012",
        phone: formData.phoneNumber,
        // withdrawal_wallet: formData.withdrawal_wallet,
        username: `${formData.firstName} `,
        country: formData?.country?.label,
      });

      if (response?.data?.success) {
        const emailResponse = await authService.sendVerificationEmail({
          email: formData.email,
          userId: response?.data?.data?.userId,
        });
        console.log(emailResponse);
        // if (emailResponse?.status === 200) {
        setFormData({
          hasSponsor: false,
          position: "left",
          sponsorId: "CROWN-",
          sponsorName: "",
          firstName: "",
          country: null,
          phoneNumber: "",
          email: "",
          confirmEmail: "",
          password: "",
          confirmPassword: "",
          acceptTerms: false,
        });
        toast.success(
          "Verification link sent to your email. Please check your inbox."
        );
        handleNavigate("/login");
        //  }
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Error while registering with us. Please try after some time"
      );
    } finally {
      changeLoadingStates("isSignUpLoading", false);
    }
  };

  // const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (paramSponsorId) {
      setFormData((prev) => ({
        ...prev,
        sponsorId: paramSponsorId,
        hasSponsor: true,
      }));
    }

    if (paramPosition) {
      setFormData((prev) => ({ ...prev, position: paramPosition }));
    }
  }, [paramPosition, paramSponsorId]);

  const validationFilteredStates = Object.keys(formData).filter(
    (el) => el !== "hasSponsor" && el !== "sponsorId" && el !== "sponsorName"
  );

  const isButtonDisabled = useMemo(
    () =>
      Object.values(errors).some((error) => error !== "") ||
      validationFilteredStates.filter((el) => formData[el] === "")?.length > 0,
    [errors, formData]
  );

  return (
    <div
      className="w-full flex flex-col md:flex-row h-full bg-custom-eclipse"
      style={{ fontFamily: "Monument Extended" }}
    >
      <div className="mx-auto w-full md:w-1/2 text-center flex flex-col justify-center px-2 md:px-24 mt-4 md:mt-0">
        <div className=" text-center flex flex-row justify-center gap-6 mb-12 items-center ">
          <a href="/">
            <img src="/assets/img/logoname.png" className="w-16" />
          </a>
          <a href="/">
            <div className="font-bold text-4xl">Crown Bankers</div>
          </a>
        </div>
        <div className="block rounded-lg text-left ">
          <div className="flex flex-col gap-6 font-bold">
            <div className="flex items-center gap-4">
              <label className="text-3xl font-bold">
                Do you have a sponsor ?
              </label>
              <div className="flex items-center gap-4 text-xl">
                <input
                  type="radio"
                  name="hasSponsor"
                  checked={formData.hasSponsor}
                  onChange={handleRadioChange}
                />
                <label className="">Yes</label>
                <input
                  type="radio"
                  name="hasSponsor"
                  checked={!formData.hasSponsor}
                  onChange={handleRadioChange}
                  className=""
                />
                <label className="">No</label>
              </div>
            </div>
            {formData.hasSponsor && (
              <div className="w-full flex flex-col md:flex-row gap-2">
                <div className="w-full md:w-1/2 ">
                  <input
                    type="text"
                    name="sponsorId"
                    value={formData.sponsorId}
                    onChange={handleChange}
                    placeholder="Sponsor ID"
                    className="h-12 rounded-[10px] border border-secondary bg-white px-3 py-3 text-black outline-none transition-all focus:border-colorOrangyRed placeholder:text-slate-500 w-full"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <input
                    type="text"
                    name="sponsorName"
                    value={formData.sponsorName}
                    readOnly
                    placeholder="Sponsor Name"
                    className="h-12 rounded-[10px] border border-secondary bg-white px-3 py-3 text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed w-full"
                  />
                </div>
              </div>
            )}
            <div className="flex items-center space-x-4">
              <label className="">Position</label>
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  checked={paramPosition === "right"}
                  onChange={() =>
                    setSearchParams((prev) => ({
                      ...prev,
                      sponsorId: paramSponsorId,
                      position: "right",
                    }))
                  }
                />
                <label className="">Right</label>
                <input
                  type="radio"
                  checked={paramPosition === "left"}
                  onChange={() =>
                    setSearchParams((prev) => ({
                      ...prev,
                      sponsorId: paramSponsorId,
                      position: "left",
                    }))
                  }
                  className=""
                />
                <label className="">Left</label>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-2">
              <div className="flex flex-col w-full md:w-1/2">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="h-12 rounded-[10px] border border-secondary bg-white px-3 py-3 text-black outline-none transition-all placeholder:text-gray-500 focus:border-colorOrangyRed"
                  onBlur={() => handleBlur("firstName")}
                />
                <ErrorMessage
                  error={errors.firstName}
                  touched={touched.firstName}
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onBlur={() => handleBlur("phoneNumber")}
                  onChange={handleChange}
                  placeholder="Enter phone"
                  className="h-12 rounded-[10px] border border-secondary bg-white px-3 py-3 text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed"
                />
                <ErrorMessage
                  error={errors.phoneNumber}
                  touched={touched.phoneNumber}
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Select
                options={options}
                customStyles={customStyles}
                value={formData.country}
                placeHolder={"Select your country"}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, country: value }));
                }}
                onBlur={() => handleBlur("country")}
              />
              <ErrorMessage error={errors.country} touched={touched.country} />
            </div>
            <div className="w-full flex flex-col md:flex-row gap-2">
              <div className="flex flex-col w-full md:w-1/2">
                <input
                  type="t"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="h-12 rounded-[10px] border border-secondary bg-white px-3 py-3 text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed"
                  onBlur={() => handleBlur("email")}
                />
                <ErrorMessage error={errors.email} touched={touched.email} />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <input
                  type="confirmEmail"
                  name="confirmEmail"
                  value={formData.confirmEmail}
                  onChange={handleChange}
                  onBlur={() => handleBlur("confirmEmail")}
                  placeholder="Confirm email"
                  className="h-12 rounded-[10px] border border-secondary bg-white px-3 py-3 text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed"
                />
                <ErrorMessage
                  error={errors.confirmEmail}
                  touched={touched.confirmEmail}
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-2">
              <div className="flex flex-col w-full md:w-1/2">
                <div className="flex relative flex-column justify-between h-12 rounded-[10px] border border-secondary bg-white px-3 py-3 text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onBlur={() => handleBlur("password")}
                    onChange={handleChange}
                    id="signup-password"
                    placeholder="Enter Password"
                    className="outline-none"
                    required=""
                  />
                  <div
                    className="absolute top-3 right-2 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEyeSlash color="#000" size={18} />
                    ) : (
                      <FaEye color="#000" size={18} />
                    )}
                  </div>
                </div>
                <ErrorMessage
                  error={errors.password}
                  touched={touched.password}
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <div className="flex relative flex-column justify-between h-12 rounded-[10px] border border-secondary bg-white px-3 py-3 text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onBlur={() => handleBlur("confirmPassword")}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="outline-none"
                  />
                  <div
                    className="absolute flex items-center top-3 right-2 cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash color="#000" size={18} />
                    ) : (
                      <FaEye color="#000" size={18} />
                    )}
                  </div>
                </div>
                <ErrorMessage
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />
              </div>
            </div>
            {/* Form Single Input */}
            {/* Form Single Input */}
            <div className="flex gap-x-8">
              <input
                className="relative appearance-none after:absolute after:left-0 after:top-[6px] after:h-4 after:w-4 after:rounded-[3px] after:border after:border-[#7F8995] after:bg-white after:text-white after:transition-all after:delay-300 checked:after:border-colorOrangyRed checked:after:bg-colorOrangyRed checked:after:bg-[url('/assets/img/th-1/icon-white-checkmark-filled.svg')]"
                type="checkbox"
                name="acceptTerms"
                checked={!formData.acceptTerms}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="signup-check" className="text-xl font-normal">
                I have read and accept the &nbsp;
                <a
                  href="/TermsandCondition"
                  className="font-bold hover:text-colorOrangyRed"
                >
                  Terms &amp; Conditions
                </a>
                &nbsp; and &nbsp;
                <a
                  href="/PrivacyPolicies"
                  className="font-bold hover:text-colorOrangyRed"
                >
                  Privacy Policy
                </a>
              </label>
              <ErrorMessage
                error={errors.acceptTerms}
                touched={touched.acceptTerms}
              />
            </div>
            {/* Form Single Input */}
          </div>
          <button
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            className="button mt-7 block rounded-[50px] border-2 border-black bg-primary w-full py-4 text-white text-2xl after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white"
          >
            {loadingStates.isSignUpLoading && (
              <span className="absolute inset-0 flex items-center justify-center">
                <CgSpinner className="animate-spin" size={20} />
              </span>
            )}
            {!loadingStates.isSignUpLoading && "Create Account"}
          </button>

          {/* API Signup */}
          <div className="mt-10 text-center">
            Already have an account? &nbsp;
            <Link
              to="/login"
              className="text-base font-semibold hover:text-colorOrangyRed"
            >
              Log in here
            </Link>
          </div>
        </div>
      </div>
      <div className="relative w-full md:w-1/2 h-[600px] md:h-screen ">
        {/* Background Image */}
        {/* <img
          src="/assets/LoginBg.png"
          className="w-full h-full"
          alt="Background"
        /> */}

        {/* Overlayed Login Image */}
        <img
          src="/assets/img/th-1/15.png"
          className="absolute top-[6%] left-[10%] w-[80%] h-[88%]"
          alt="Login"
        />
      </div>
      {/* Section Container */}
    </div>
  );
};

export default Signup;
