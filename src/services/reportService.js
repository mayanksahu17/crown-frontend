import axios from "./axios";

const getROIReport = (user) => {
  return axios.get(`/roi-transactions/user?email=${user?.user?.email}`);
};

const getBIReport = (user) => {
  return axios.get(`/binary-transactions/user?email=${user?.user?.email}`);
};

const getRIReport = (user) => {
  return axios.get(`/referral-transactions/user?email=${user?.user?.email}`);
};

const getDepositReport = (user) => {
  return axios.get(
    `/deposits/user/${user?.user?.userId}?email=${user?.user?.email}`
  );
};

const getExtraIncomeReport = (user) => {
  return axios.get(`/career-rewards/user?email=${user?.user?.email}`);
};

const getTokenReport = (user) => {
  return axios.get(
    `/tokens/user/${user?.user?.userId}?email=${user?.user?.email}`
  );
};

const getWithdrawalReport = (user) => {
  return axios.get(`withdrawal/user?email=${user?.user?.email}`);
};

const getTradeReport = (user) => {
  return axios.get(`kyc/report?email=${user?.user?.email}`);
};

const reportService = {
  getROIReport,
  getBIReport,
  getRIReport,
  getDepositReport,
  getExtraIncomeReport,
  getTokenReport,
  getWithdrawalReport,
  getTradeReport,
};

export default reportService;
