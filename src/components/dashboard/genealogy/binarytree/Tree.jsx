import TreeNode from "./TreeNode";

export default function Tree({ data }) {
  return (
    <div className="p-2 border border-solid rounded-md border-gray-300 flex justify-center align-center">
      <table className="w-full text-white gap-2 rounded bg-gray-800">
        <thead>
          <tr>
            <th className="w-1/3 text-white text-center border border-gray-500 rounded-tl text-transparent bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text font-semibold">
              {data?.name}
            </th>
            <th className="w-1/3 text-white text-center px-4 border border-gray-500 text-transparent bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text font-semibold">
              Left
            </th>
            <th className="w-1/3 text-white text-center px-4 border border-gray-500 rounded-tr text-transparent bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text font-semibold">
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
            leftCount={data && data.left_business ? data.left_business : "0.00"}
            rightCount={
              data && data.right_business ? data.right_business : "0.00"
            }
          />
          <TreeNode
            name="Carry"
            leftCount={data && data.left_carry ? data.left_carry : "0.00"}
            rightCount={data && data.right_carry ? data.right_carry : "0.00"}
          />

          <TreeNode
            isSingle={true}
            name="Matching Due"
            leftCount={data && data.matching_due ? data.matching_due : "0.00"}
          />
          <TreeNode
            isSingle={true}
            name="Binary Due"
            leftCount={data && data.binary_due ? data.binary_due : "0.00"}
          />
          <TreeNode
            isSingle={true}
            name="Capping Limit"
            leftCount={data && data.capping_limit ? data.capping_limit : "0.00"}
            rounded="bottom"
          />
        </tbody>
      </table>
    </div>
  );
}
