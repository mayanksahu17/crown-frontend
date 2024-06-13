import clsx from "clsx";

export default function TreeNode({
  name,
  isSingle,
  leftCount,
  rightCount,
  rounded,
}) {
  const formatValue = (name, value) => {
    if (
      name === "Business" ||
      name === "Direct Business" ||
      name === "Matching Due" ||
      name === "Carry" ||
      name === "Binary Due"
    ) {
      return `$${value}`;
    }
    return value;
  };

  return (
    <tr>
      <td
        className={clsx(
          "px-4 border border-gray-500 text-red-600 font-semibold",
          rounded === "bottom" && "rounded-bl"
        )}
      >
        {name}
      </td>

      {isSingle ? (
        <td className="text-center px-4 border border-gray-500" colSpan="2">
          {formatValue(name, leftCount)}
        </td>
      ) : (
        <>
          <td className="text-center px-4 border border-gray-500">
            {formatValue(name, leftCount)}
          </td>
          <td className="text-center px-4 border border-gray-500">
            {formatValue(name, rightCount)}
          </td>
        </>
      )}
    </tr>
  );
}
