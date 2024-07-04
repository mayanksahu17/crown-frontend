import { useParams, useNavigate } from "react-router-dom";
import genealogyService from "../../../services/genealogyService";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import BinaryNode from "./binarytree/BinaryNode";
import clsx from "clsx";

export default function UserBinaryTree() {
  const { userId } = useParams();
  const { user } = useAuth();
  const [inputData, setInputData] = useState();
  if (userId < user?.user?.userId) {
    return;
  }
  const [allData, setAllData] = useState({
    binaryTreeData: [],
    selectedButton: "",
  });
  const handleNavigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Scroll to the middle of the container
      containerRef.current.scrollLeft =
        containerRef.current.scrollWidth / 2 -
        containerRef.current.clientWidth / 2;
    }
  }, []);
  useEffect(() => {
    (async () => {
      const response = await genealogyService.getBinaryTreeDataById(
        userId,
        user
      );
      setAllData((prev) => ({ ...prev, binaryTreeData: response?.data?.data }));
    })();
  }, [userId]);

  const getNodeById = (id) =>
    allData?.binaryTreeData.find((el) => el?.i === id);

  const buttons = [
    {
      name: "Upline",
      onClick: () => {
        if (user?.user?.userId === getNodeById(1)?.parent_id) {
          handleNavigate("/dashboard/genealogy/binary");
        } else {
          handleNavigate(
            `/dashboard/genealogy/binary/${getNodeById(1)?.parent_id}`
          );
        }
      },
    },
    {
      name: "Reset",
      onClick: () => handleNavigate("/dashboard/genealogy/binary"),
    },
  ];

  return (
    allData.binaryTreeData?.length > 0 && (
      <div className="w-full">
        <div className="flex items-center gap-4 justify-end  mt-8">
          <input
            id="user_id"
            className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md  block
                p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
            value={inputData}
            name="userId"
            type="text"
            placeholder="User ID"
            onChange={(e) => {
              setInputData(e.target.value);
            }}
          />
          <button
            className="w-[300px] py-1 border-r bg-textred text-white border-gray-200 hover:bg-[#c7b483] last:border-none font-medium"
            onClick={() => {
              handleNavigate(`/dashboard/genealogy/binary/${inputData}`);
            }}
          >
            Continue
          </button>
        </div>
        <div className="flex justify-end w-full items-center py-8 ">
          <div
            className={clsx(
              "flex w-1/3 md:w-1/6 rounded-lg overflow-hidden  border"
            )}
          >
            {buttons.map((el, index) => (
              <button
                className={clsx(
                  "w-full py-1 border-r bg-textred text-white border-gray-200 hover:bg-[#c7b483] last:border-none font-medium"
                )}
                key={index}
                onClick={el?.onClick}
              >
                {el?.name}
              </button>
            ))}
          </div>
        </div>
        <div
          className="overflow-x-auto min-h-[100vh] py-40 w-full md:px-12 md:mt-0"
          ref={containerRef}
        >
          <div className="mx-auto max-w-[100vw] px-[800px] lg:px-0">
            <div className="flex flex-col items-center justify-center">
              <BinaryNode data={getNodeById(1)} first />
              <div className="flex items-center justify-center">
                <div className="h-[2px] bg-gray-300 w-[528px]" />
              </div>
              <div className="flex gap-[406px]">
                <BinaryNode data={getNodeById(2)} />
                <BinaryNode data={getNodeById(3)} />
              </div>
              <div className="flex relative" style={{ gap: 338, marginTop: 0 }}>
                <div className="h-[2px] bg-gray-300 absolute w-[270px] right-[135px]" />
                <div className="h-[2px] bg-gray-300 absolute w-[272px] left-[135px]" />
              </div>
              <div className="flex gap-[151px]">
                <BinaryNode data={getNodeById(4)} side />
                <BinaryNode data={getNodeById(5)} />
                <BinaryNode data={getNodeById(6)} />
                <BinaryNode data={getNodeById(7)} />
              </div>
              <div className="flex relative gap-[157px]">
                <div className="h-[2px] bg-gray-300 absolute w-[143px] right-[360px]" />
                <div className="h-[2px] bg-gray-300 absolute w-[145px] right-[71px]" />
                <div className="h-[2px] bg-gray-300 absolute w-[142px] left-[73px]" />
                <div className="h-[2px] bg-gray-300 absolute w-[145px] left-[360px]" />
              </div>
              <div className="flex gap-6 px-0">
                <BinaryNode last data={getNodeById(8)} side />
                <BinaryNode last data={getNodeById(9)} />
                <BinaryNode last data={getNodeById(10)} />
                <BinaryNode last data={getNodeById(11)} />
                <BinaryNode last data={getNodeById(12)} />
                <BinaryNode last data={getNodeById(13)} />
                <BinaryNode last data={getNodeById(14)} />
                <BinaryNode last data={getNodeById(15)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
