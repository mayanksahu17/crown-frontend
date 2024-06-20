import Card from "./Card";

export default function HomeStats({
  selectedWallet,
  setSelectedWallet,
  cardsData,
}) {
  return (
    <div className="hidden lg:flex flex-col items-start max-w-[19rem] w-full h-full min-h-screen  py-10 px-6 ">
      <div className="flex flex-col w-full space-y-4 ">
        {cardsData.map((el, index) => (
          <Card
            key={index}
            {...el}
            isSelected={selectedWallet === el.value}
            setSelectedWallet={(value) => {
              setSelectedWallet(value);
            }}
          />
        ))}
      </div>
    </div>
  );
}
