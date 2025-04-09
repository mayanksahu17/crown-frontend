import TreeNode from "./TreeNode";

export default function Tree({ data }) {
  return (
    <div className="p-2 border border-solid rounded-md flex justify-center align-center">
      <table className="w-full text-black gap-2 rounded bg-white">
        <thead>
          <tr>
            <th className="w-1/3 text-black text-center border border-gray-500 rounded-tl  font-semibold">
              {data?.name}
            </th>
            <th className="w-1/3 text-black text-center px-4 border border-gray-500  font-semibold">
              Left
            </th>
            <th className="w-1/3 text-black text-center px-4 border border-gray-500 rounded-tr  font-semibold">
              Right
            </th>
          </tr>
        </thead>
        <tbody>
          <TreeNode
            name="Downlines"
            leftCount={data && data.left_downlines ? data.left_downlines : "0"}
            rightCount={
              data && data.right_downlines ? data.right_downlines : "0"
            }
          />
          <TreeNode
            name="Business"
            leftCount={
              data && data.left_business
                ? parseFloat(data.left_business).toFixed(2)
                : "0.00"
            }
            rightCount={
              data && data.right_business
                ? parseFloat(data.right_business).toFixed(2)
                : "0.00"
            }
          />
          <TreeNode
            name="Carry"
            leftCount={
              data && data.left_carry
                ? parseFloat(data.left_carry).toFixed(2)
                : "0.00"
            }
            rightCount={
              data && data.right_carry
                ? parseFloat(data.right_carry).toFixed(2)
                : "0.00"
            }
          />

          <TreeNode
            isSingle={true}
            name="Matching Due"
            leftCount={
              data && data.matching_due
                ? parseFloat(data.matching_due).toFixed(2)
                : "0.00"
            }
          />
          <TreeNode
            isSingle={true}
            name="Binary Due"
            leftCount={
              data && data.binary_due
                ? parseFloat(data.binary_due).toFixed(2)
                : "0.00"
            }
          />
          <TreeNode
            isSingle={true}
            name="Capping Limit"
            leftCount={
              data && data.capping_limit
                ? parseFloat(data.capping_limit).toFixed(2)
                : "0.00"
            }
            rounded="bottom"
          />
        </tbody>
      </table>
    </div>
  );
}
