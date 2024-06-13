import axios from "./axios";

const sendOTP = (user) => {
  return axios.post(`/wallets/withdrawal-wallet-otp`, {
    email: user?.user?.email,
  });
};

const updateWithdrawWallet = (user, data) => {
  return axios.put(`/wallets/withdrawal-wallet`, {
    ...data,
    email: user?.user?.email,
  });
};

const walletAddressService = {
  sendOTP,
  updateWithdrawWallet,
};

export default walletAddressService;
