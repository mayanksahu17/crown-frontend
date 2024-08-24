import { useState } from "react";
import CustomSelect from "../global/CustomSelect";
import Button from "../global/Button";
import ticketService from "../../../services/ticketService";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";

export default function SubmitTicket() {
  const { user } = useAuth();

  const [allInputs, setAllInputs] = useState({
    selectedDepartment: { label: "Admin Support", value: "Admin Support" },
    selectedService: {
      label: "Package Activation",
      value: "Package Activation",
    },
    selectedAttachment: null,
    subject: "",
    description: "",
    isLoading: false,
  });

  const handleAllInputsChange = (name, value) =>
    setAllInputs((prev) => ({ ...prev, [name]: value }));

  const handleTicketSubmit = async () => {
    try {
      handleAllInputsChange("isLoading", true);

      const inputData = {
        department: allInputs.selectedDepartment.value,
        service: allInputs.selectedService.value,
        subject: allInputs.subject,
        description: allInputs.description,
        status: "Open",
      };

      const res = await ticketService.createTicket(user, inputData);
      const ticketId = res.data?.data?.ticketId;

      if (ticketId && allInputs.selectedAttachment) {
        const uploadData = new FormData();
        uploadData.append("docType", "TICKET_DOC");
        uploadData.append("file", allInputs.selectedAttachment);
        uploadData.append("email", user?.user?.email);

        const uploadRes = await ticketService.uploadTicketDocument(
          ticketId,
          uploadData
        );

        if (uploadRes?.data?.success) {
          toast.success("Ticket created successfully");
        }
      } else {
        toast.success("Ticket created successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setAllInputs({
        selectedDepartment: {
          label: "Admin Support",
          value: "Admin Support",
        },
        selectedService: {
          label: "Package Activation",
          value: "Package Activation",
        },
        selectedAttachment: null,
        subject: "",
        description: "",
        isLoading: false,
      });
    }
  };

  return (
    <div className="mt-4 w-full text-white">
      <h4 className="text-xl">Submit Ticket</h4>
      <div className="mt-2 w-full">
        <div className="w-full">
          <label className="block text-[#fff] font-normal">
            Select Department
          </label>
          <CustomSelect
            className="w-full"
            options={[
              { label: "Admin Support", value: "Admin Support" },
              { label: "Technical Support", value: "Technical Support" },
            ]}
            placeHolder="Select Department"
            handleChange={(value) =>
              handleAllInputsChange("selectedDepartment", value)
            }
            value={allInputs.selectedDepartment}
          />
        </div>
        <div className="mt-4 w-full">
          <label className="block text-[#fff] font-normal">
            Select Service
          </label>
          <CustomSelect
            className="w-full"
            options={[
              { label: "Package Activation", value: "Package Activation" },
              { label: "Downline Activation", value: "Downline Activation" },
              { label: "Authentication", value: "Authentication" },
            ]}
            placeHolder="Select Service"
            handleChange={(value) =>
              handleAllInputsChange("selectedService", value)
            }
            value={allInputs.selectedService}
          />
        </div>
        <div className="w-full mt-4 ">
          <div className="w-full">
            <label className="block text-[#fff] font-normal">Subject</label>
            <input
              type="text"
              className="w-full text-sm bg-transparent text-gray-500 border border-secondary px-2.5 py-2.5 rounded-md  outline-none mt-1 !ml-0"
              placeholder="Write a Subject"
              name="subject"
              value={allInputs.subject}
              onChange={(e) => handleAllInputsChange("subject", e.target.value)}
            />
          </div>
          <div className="w-full mt-4">
            <label className="block text-[#fff] font-normal">Description</label>
            <textarea
              type="text"
              className="w-full text-sm bg-transparent text-gray-500 border border-secondary px-2.5 py-2.5 rounded-md  outline-none mt-1 !ml-0"
              placeholder="Write description"
              rows="2"
              onChange={(e) =>
                handleAllInputsChange("description", e.target.value)
              }
              value={allInputs.description}
            />
          </div>
          <div className="w-full mt-4">
            <label className="block text-[#fff] font-normal">
              Attachment (optional)
            </label>
            <input
              type="file"
              className="w-full text-sm bg-transparent px-1  rounded-md  outline-none mt-1 !ml-0"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (selectedFile) {
                  setAllInputs((prev) => ({
                    ...prev,
                    selectedAttachment: selectedFile,
                  }));
                }
              }}
            />
          </div>
        </div>
        <Button
          className="mt-4 "
          onClick={handleTicketSubmit}
          loading={allInputs.isLoading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
