import { IoClose } from "react-icons/io5";
import Button from "../global/Button";
import Modal from "../global/Modal";
import { useRef, useState } from "react";
import CustomSelect from "../global/CustomSelect";
import { FiUpload } from "react-icons/fi";
import userService from "../../../services/userService";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";

export default function KYCSettings() {
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    file: null,
    docType: null,
    isUploadLoading: false,
  });
  const fileRef = useRef(null);

  const handleModalChange = (val) => {
    setIsModalOpen(val);
  };

  const handleFormDataChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFormDataChange("file", file);
    }
  };

  const handleFileAttach = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleUpload = async () => {
    try {
      setIsModalOpen(false);
      handleFormDataChange("isUploadLoading", true);

      const fileFormData = new FormData();
      fileFormData.append("docType", formData?.docType?.value);
      fileFormData.append("file", formData.file);
      const res = await userService.updateProfileImages(user, fileFormData);
      if (res?.data?.success) {
        toast.success("KYC submitted successfully");
      }

      console.log(res);
    } catch (error) {
      console.log(error);
      handleFormDataChange("isUploadLoading", false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      handleFormDataChange("isUploadLoading", false);
      setFormData({
        file: null,
        docType: null,
        isUploadLoading: false,
      });
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl ">KYC Settings</h1>
      <p className="text-gray-600 text-sm mt-1">
        To adhere to regulatory requirements, all users must complete identity
        verification to prevent fraudulent activities. You have not yet
        submitted the required documents for this process. To continue your
        investments, please verify your identity.
      </p>

      <div className="w-full mt-6 text-white">
        <p className="text-2xl text-white font-semibold leading-tighter">
          Upload Document
        </p>
        <p className="leading-tight mt-1">
          In order to complete, please upload any one of the following personal
          documents
        </p>
      </div>
      <div className="mt-4">
        <label className="block  font-normal">Select Document Type</label>
        <CustomSelect
          options={[
            { label: "Passport", value: "PASSPORT" },
            { label: "Driving License", value: "DRIVING_LICENSE" },
            { label: "National ID", value: "NATIONAL_ID" },
          ]}
          handleChange={(value) => handleFormDataChange("docType", value)}
          value={formData.docType}
        />
      </div>
      <div className="mt-4">
        <label className="block  font-normal">Add Document Image</label>
        <div
          className={`py-1.5 px-4 border ${
            formData.file ? "border-green-500" : "border-[#E7E8EB]"
          } rounded-md h-[104px] flex flex-col items-center justify-center cursor-pointer w-full`}
          onClick={handleFileAttach}
          disabled={formData.file ? true : false}
        >
          <div className="flex flex-col items-center">
            <FiUpload />
            <p
              className={`text-[#6D7785] text-[12px] ${
                formData.file && "text-green-500"
              }`}
            >
              {formData.file ? "Document Attached" : "Attach a Document File"}
            </p>
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              disabled={formData.file ? true : false}
            />
          </div>
        </div>
      </div>
      <Button
        className="w-full !px-6 !h-10 !mt-3  "
        disabled={!formData.file || !formData.docType}
        onClick={handleUpload}
        loading={formData.isUploadLoading}
      >
        Upload
      </Button>
    </div>
  );
}
