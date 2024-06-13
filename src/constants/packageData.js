import { BeginImage, GrowImage, ThriveImage } from "../assets";

const packageData = [
  {
    name: "Begin",
    image: BeginImage,
    minAmount: 25,
    maxAmount: 4999,
    description: "Get started with our entry-level investment package.",
    dailyReturns: "1.2%",
    durationInDays: 200,
    id: 1,
  },
  {
    name: "Grow",
    image: GrowImage,
    minAmount: 5000,
    maxAmount: 24999,
    description:
      "Experience steady growth with our mid-tier investment package.",
    dailyReturns: "1.2%",
    durationInDays: 200,
    id: 2,
  },
  {
    name: "Thrive",
    image: ThriveImage,
    minAmount: 25000,
    maxAmount: 75000,
    description:
      "Take your investments to the next level with our professional package.",
    dailyReturns: "1.2%",
    durationInDays: 200,
    id: 3,
  },
];

export default packageData;
