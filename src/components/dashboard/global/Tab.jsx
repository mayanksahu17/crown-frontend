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
      <div className={clsx("hidden lg:flex items-center")}>
        {data.map(({ name, route }, index, arr) => (
          <div
            key={index}
            className={clsx(
              "py-1 px-4 font-light cursor-pointer",
              selectedTab === route?.split("/")?.findLast((el) => el)
                ? "bg-white border-b-4  text-black border-black"
                : "bg-white !text-black",
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
