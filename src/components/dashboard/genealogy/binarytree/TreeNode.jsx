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
          "p-1 border border-gray-500 text-colorBlue font-semibold text-xs",
          rounded === "bottom" && "rounded-bl"
        )}
      >
        {name}
      </td>

      {isSingle ? (
        <td className="text-center p-1 border border-gray-500 text-xs" colSpan="2">
          {formatValue(name, leftCount)}
        </td>
      ) : (
        <>
          <td className="text-center p-1 border border-gray-500 text-xs">
            {formatValue(name, leftCount)}
          </td>
          <td className="text-center p-1 border border-gray-500 text-xs">
            {formatValue(name, rightCount)}
          </td>
        </>
      )}
    </tr>
  );
}
