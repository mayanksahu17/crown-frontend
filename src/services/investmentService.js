import axios from "./axios";

const getDownlineReport = (user) => {
  return axios.get(`/investments/downline?email=${user?.user?.email}`);
};

const getPackageReport = (user) => {
  return axios.get(`/investments/user?email=${user?.user?.email}`);
};

const createInvestment = (user, data) => {
  return axios.post(`/payment/create_transaction`, {
    ...data,
    email: user?.user?.email,
  });
};
const createNowInvestment = (user, data) => {
  return axios.post(`/nowpayment/create_transaction`, {
    ...data,
    email: user?.user?.email,
  });
};

const investmentService = {
  getDownlineReport,
  getPackageReport,
  createInvestment,
  createNowInvestment,
};

export default investmentService;
