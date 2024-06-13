export default function Card({ name, value, icon }) {
  return (
    <div
      className="relative w-full h-full py-3 px-3 bg-textred rounded-md lg:rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, #d5e0fc, #d4f3fc, #fcddd4, #ddd4fc)",
      }}
    >
      <div className="flex items-center space-x-4">
        <img src={icon} alt={name} className="h-8 w-auto" />
        <div className="flex flex-col items-start">
          <h4 className="text-lg tracking-[0.2px]">{name}</h4>
          <h5 className="text-2xl font-semibold tracking-wider">${value}</h5>
        </div>
      </div>
    </div>
  );
}
