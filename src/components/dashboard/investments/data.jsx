import {
  BeginImage,
  GrowImage,
  ThriveImage,
  TurboImage,
} from "../../../assets";
export const packageData = [
  {
    name: "Solar Starter",
    image: BeginImage,
    minAmount: 25,
    maxAmount: 2499,
    description: "Get started with our entry-level investment package.",
    dailyReturns: "1.5%",
    durationInDays: 150,
    id: 1,
  },
  {
    name: "Power Growth",
    image: GrowImage,
    minAmount: 2500,
    maxAmount: 19999,
    description:
      "Experience steady growth with our mid-tier investment package.",
    dailyReturns: "1.8%",
    durationInDays: 140,
    id: 2,
  },
  {
    name: "Elite Energy",
    image: ThriveImage,
    minAmount: 20000,
    maxAmount: 50000,
    description:
      "Take your investments to the next level with our professional package.",
    dailyReturns: "2.1%",
    durationInDays: 130,
    id: 3,
  },
];
export const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "1px",
    fontWeight: "400",
  }),
  options: (provided) => ({
    ...provided,
    fontWeight: "400",
  }),
};
