import axios from "./axios";

const makeDeposit = async (data) => {
  return axios.post("/payment/create_transaction", data);
};

const depositService = {
  makeDeposit,
};

export default depositService;
