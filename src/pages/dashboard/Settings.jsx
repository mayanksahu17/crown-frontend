import { useEffect, useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { useAuth } from "../../hooks/useAuth";
import {
  KYCSettings,
  NotificationSettings,
  SecuritySettings,
  ProfileSettings,
  Tab,
} from "../../components";
import userService from "../../services/userService";
import toast from "react-hot-toast";
import { UserAvatar } from "../../assets";
import dashboardService from "../../services/dashboardService";

const Settings = () => {
  const { user, updateUserDetails } = useAuth();
  const [allImages, setAllImages] = useState({
    profileCover: user?.user?.profile_cover || null,
    profileImage: user?.user?.profile_picture || null,
  });
  const [allData, setAllData] = useState({
    notificationSettings: [],
    walletAddress: "N/A",
  });

  const handleAllDataChange = (name, value) =>
    setAllData((prev) => ({ ...prev, [name]: value }));

  const profileCoverRef = useRef(null);
  const profileImageRef = useRef(null);

  const handleImageIconClick = (ref) => () => {
    ref.current.click();
  };

  const handleAllImagesChange = (name, value) =>
    setAllImages((prev) => ({ ...prev, [name]: value }));

  const handleFileInputChange = (name) => async (event) => {
    const selectedFile = event.target.files[0];
    handleAllImagesChange(name, URL.createObjectURL(selectedFile));

    let docType = name === "profileCover" ? "PROFILE_COVER" : "PROFILE";

    const fileFormData = new FormData();
    fileFormData.append("docType", docType);
    fileFormData.append("file", selectedFile);
    try {
      const response = await userService.updateProfileImages(
        user,
        fileFormData
      );
      if (response?.data?.success) {
        const updatedUserResponse = await userService.getUserData(user);
        if (updatedUserResponse?.data?.success) {
          updateUserDetails(updatedUserResponse?.data?.data);
          let message =
            name === "profileCover"
              ? "Profile Cover Updated Successfully"
              : "Profile Picture Updated Successfully";
          toast.success(message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const [dashboardResponse] = await Promise.all([
          dashboardService.getDashboardData(user),
        ]);

        if (dashboardResponse?.data?.success) {
          handleAllDataChange(
            "walletAddress",
            dashboardResponse?.data?.data?.withdrawal_wallet
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  const data = [
    {
      name: "Profile Settings",
      route: "/dashboard/settings/profile",
      children: <ProfileSettings />,
    },
    {
      name: "Security Settings",
      route: "/dashboard/settings/security",
      children: <SecuritySettings />,
    },
    {
      name: "Notification Settings",
      route: "/dashboard/settings/notification",
      children: <NotificationSettings />,
    },
    {
      name: "KYC Settings",
      route: "/dashboard/settings/kyc",
      children: <KYCSettings />,
    },
  ];

  return (
    <div className="max-w-full w-full md:max-w-[80%] mx-auto ">
      <div className="w-full h-[200px] md:h-[240px] lg:h-[280px] relative ">
        <input
          type="file"
          className="hidden"
          ref={profileCoverRef}
          onChange={handleFileInputChange("profileCover")}
          accept="image/*"
        />
        <img
          className="w-full h-full rounded-lg border-none object-cover"
          style={{
            background:
              !allImages.profileCover &&
              "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
          }}
          src={allImages.profileCover}
        />

        <input
          type="file"
          className="hidden"
          ref={profileImageRef}
          onChange={handleFileInputChange("profileImage")}
          accept="image/*"
        />
        <img
          src={allImages.profileImage || UserAvatar}
          className="absolute left-5 -bottom-[60px] cursor-pointer lg:-bottom-[90px] w-[120px] h-[120px] lg:w-[180px] lg:h-[180px] rounded-lg bg-gray-200 border-[4px] border-white object-cover"
          onClick={handleImageIconClick(profileImageRef)}
        />

        <button
          className="bg-white rounded-md flex items-center justify-center p-2 absolute right-5 bottom-5"
          onClick={handleImageIconClick(profileCoverRef)}
        >
          <LuImagePlus size={22} color="#000" />
        </button>
      </div>
      <div className="flex justify-between h-full">
        <div className="mt-16 lg:mt-24 w-[160px] md:w-[220px] text-left">
          <h1 className="font-semibold text-[#050023] text-2xl md:text-3xl">
            {user?.user?.name}
          </h1>
          <p className="text-[#737A99] font-normal text-sm md:text-base">
            USER ID - {user?.user?.userId}
          </p>
          <p className="text-[#737A99] font-normal text-sm md:text-base">
            PIN - {user?.user?.security_pin}
          </p>
          <p className="text-[#737A99] font-normal text-sm md:text-base">
            WALLET ADDRESS - {allData.walletAddress}
          </p>
        </div>
      </div>
      <div className="mt-6 w-full">
        <Tab data={data} />
      </div>
    </div>
  );
};

export default Settings;
