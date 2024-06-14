export default function Card({ name, value, icon }) {
  return (
    <div className="relative w-full h-full py-3 px- rounded-md lg:rounded-xl overflow-hidden">
      <div className="flex items-center space-x-4">
        <div className="p-2 rounded-2xl bg-white ">
          <div className="flex w-full items-center justify-between">
            <img src={icon} alt={name} className=" h-8 w-auto" />
          </div>
        </div>

        <div className="flex flex-col items-start">
          <h4 className="text-lg tracking-[0.2px] text-white">{name}</h4>
        </div>
      </div>
    </div>
  );
}
