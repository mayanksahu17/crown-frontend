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
    hasSponsor: true,
    position: "left",
    sponsorId: "CROWN-000000",
    sponsorName: "CROWN",
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
          : "CROWN-000000",
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
          hasSponsor: true,
          position: "left",
          sponsorId: "CROWN-000000",
          sponsorName: "CROWN",
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
    <>
      <main className="main-wrapper relative overflow-hidden">
        {/*...::: Signup Section Start :::... */}
        <section id="signup-section">
          {/* Section Spacer */}
          <div className="py-40 pt-36 xl:pb-[200px] xl:pt-[180px]">
            {/* Section Container */}
            <div className="global-container">
              <div className="mx-auto max-w-[910px] text-center">
                <h1 className="mb-[50px]">Create Account</h1>
                <div className="block rounded-lg bg-white px-[30px] py-[50px] text-left shadow-[0_4px_60px_0_rgba(0,0,0,0.1)] sm:px-10">
                  <div className="grid grid-cols-1 gap-6">
                    <div className=" flex items-center space-x-4">
                      <label className="text-lg font-bold leading-[1.6] ">
                        Do you have a sponsor ?
                      </label>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="hasSponsor"
                          checked={formData.hasSponsor}
                          onChange={handleRadioChange}
                        />
                        <label className="ml-2 ">Yes</label>
                        <input
                          type="radio"
                          name="hasSponsor"
                          checked={!formData.hasSponsor}
                          onChange={handleRadioChange}
                          className="ml-4"
                        />
                        <label className="ml-2 ">No</label>
                      </div>
                    </div>
                    {formData.hasSponsor && (
                      <div className="w-full flex flex-col md:flex-row ">
                        <div className="w-full">
                          <label className="text-lg font-bold leading-[1.6] ">
                            Sponsor ID
                          </label>
                          <input
                            type="text"
                            name="sponsorId"
                            value={formData.sponsorId}
                            onChange={handleChange}
                            className="rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed"
                          />
                        </div>
                        <div className="w-full">
                          <label className="text-lg font-bold leading-[1.6] ">
                            Sponsor Name
                          </label>
                          <input
                            type="text"
                            name="sponsorName"
                            value={formData.sponsorName}
                            readOnly
                            className="rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex items-center space-x-4">
                      <label className="text-lg font-bold leading-[1.6] ">
                        Position
                      </label>
                      <div className="flex items-center">
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
                        <label className="ml-2 ">Right</label>
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
                          className="ml-4"
                        />
                        <label className="ml-2 ">Left</label>
                      </div>
                    </div>

                    <div className="flex flex-col gap-y-[10px]">
                      <label
                        htmlFor="signup-name"
                        className="text-lg font-bold leading-[1.6]"
                      >
                        Enter your name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Adam Smith"
                        className="rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed"
                        onBlur={() => handleBlur("firstName")}
                      />
                      <ErrorMessage
                        error={errors.firstName}
                        touched={touched.firstName}
                      />
                    </div>
                    <div className="flex flex-col gap-y-[10px]">
                      <label
                        htmlFor="signup-name"
                        className="text-lg font-bold leading-[1.6]"
                      >
                        Enter phone number
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onBlur={() => handleBlur("phoneNumber")}
                        onChange={handleChange}
                        placeholder="1234567"
                        className="rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed"
                      />
                      <ErrorMessage
                        error={errors.lastName}
                        touched={touched.lastName}
                      />
                    </div>
                    <div className="flex flex-col gap-y-[10px]">
                      <label
                        htmlFor="signup-name"
                        className="text-lg font-bold leading-[1.6]"
                      >
                        Select your country
                      </label>
                      <Select
                        options={options}
                        customStyles={customStyles}
                        value={formData.country}
                        onChange={(value) => {
                          setFormData((prev) => ({ ...prev, country: value }));
                        }}
                        onBlur={() => handleBlur("country")}
                      />
                      <ErrorMessage
                        error={errors.country}
                        touched={touched.country}
                      />
                    </div>
                    <div className="flex flex-col gap-y-[10px]">
                      <label
                        htmlFor="signup-email"
                        className="text-lg font-bold leading-[1.6]"
                      >
                        Email address
                      </label>
                      <input
                        type="t"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        className="rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed"
                        onBlur={() => handleBlur("email")}
                      />
                      <ErrorMessage
                        error={errors.email}
                        touched={touched.email}
                      />
                    </div>
                    <div className="flex flex-col gap-y-[10px]">
                      <label
                        htmlFor="signup-email"
                        className="text-lg font-bold leading-[1.6]"
                      >
                        Confirm Email address
                      </label>
                      <input
                        type="confirmEmail"
                        name="confirmEmail"
                        value={formData.confirmEmail}
                        onChange={handleChange}
                        onBlur={() => handleBlur("confirmEmail")}
                        placeholder="example@gmail.com"
                        className="rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed"
                      />
                      <ErrorMessage
                        error={errors.confirmEmail}
                        touched={touched.confirmEmail}
                      />
                    </div>
                    <div className="flex flex-col gap-y-[10px]">
                      <label
                        htmlFor="signup-password"
                        className="text-lg font-bold leading-[1.6]"
                      >
                        Enter Password
                      </label>
                      <div className="flex flex-column justify-between rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onBlur={() => handleBlur("password")}
                          onChange={handleChange}
                          id="signup-password"
                          placeholder="............"
                          className="outline-none"
                          required=""
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
                      <ErrorMessage
                        error={errors.password}
                        touched={touched.password}
                      />
                    </div>
                    <div className="flex flex-col gap-y-[10px]">
                      <label
                        htmlFor="signup-password"
                        className="text-lg font-bold leading-[1.6]"
                      >
                        Confirm Password
                      </label>
                      <div className="flex flex-column justify-between rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onBlur={() => handleBlur("confirmPassword")}
                          onChange={handleChange}
                          placeholder="............"
                          className="outline-none"
                        />
                        <div
                          className="  flex items-center pr-2 cursor-pointer"
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
                    {/* Form Single Input */}
                    {/* Form Single Input */}
                    <div className="flex gap-x-8 gap-y-[10px]">
                      <input
                        className="relative appearance-none after:absolute after:left-0 after:top-[6px] after:h-4 after:w-4 after:rounded-[3px] after:border after:border-[#7F8995] after:bg-white after:text-white after:transition-all after:delay-300 checked:after:border-colorOrangyRed checked:after:bg-colorOrangyRed checked:after:bg-[url('/assets/img/th-1/icon-white-checkmark-filled.svg')]"
                        type="checkbox"
                        name="acceptTerms"
                        checked={!formData.acceptTerms}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        htmlFor="signup-check"
                        className="text-base leading-[1.6]"
                      >
                        I have read and accept the
                        <Link
                          href="#"
                          className="font-bold hover:text-colorOrangyRed"
                        >
                          Terms &amp; Conditions
                        </Link>
                        &nbsp; and &nbsp;
                        <Link
                          href="#"
                          className="font-bold hover:text-colorOrangyRed"
                        >
                          Privacy Policy
                        </Link>
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
                    className="button mt-7 block rounded-[50px] border-2 border-black bg-black py-4 text-white after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white"
                  >
                    {loadingStates.isSignUpLoading && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <CgSpinner className="animate-spin" size={20} />
                      </span>
                    )}
                    {!loadingStates.isSignUpLoading && "Create account"}
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
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
        </section>
        {/*...::: Signup Section End :::... */}
      </main>
    </>
  );
};

export default Signup;
