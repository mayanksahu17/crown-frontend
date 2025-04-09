import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";

export default function Tab({ data }) {
  const params = useParams();
  const selectedTab = params.selectedRoute;
  const handleNavigate = useNavigate();

  const { children } = data.find((el) => {
    return (
      el?.route.split("/").findLast((currElem) => currElem) === selectedTab
    );
  });

  return (
    <>
      <div className={clsx("flex items-center overflow-auto")}>
        {data.map(({ name, route }, index, arr) => (
          <div
            key={index}
            className={clsx(
              "py-1 px-2 md:px-4  cursor-pointer",
              selectedTab === route?.split("/")?.findLast((el) => el)
                ? " border-b-4  font-bold text-black border-black"
                : "text-gray-700",
              arr.length - 1 === index && "rounded-tr-lg rounded-br-lg",
              index === 0 && "rounded-tl-lg rounded-bl-lg"
            )}
            onClick={() => {
              handleNavigate(route);
            }}
          >
            {name}
          </div>
        ))}
      </div>
      <div className="mt-2">{children}</div>
    </>
  );
}
