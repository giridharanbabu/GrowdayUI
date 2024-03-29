import axios from "axios";

const baseURL = "https://growday.onrender.com";

const customerService = {
  saveCusomer: (param: any, token: string) =>
    axios.post(`${baseURL}/customer/register`, param),

  getCutomers: (token: string) =>
    axios.get(`${baseURL}/list?collection_name=customers`, {
      headers: {
        token: `Bearer ${token}`,
      },
    }),

  editCustomer: (param: any, token: string) =>
    axios.post(`${baseURL}/edit/customer`, param, {
      headers: {
        token: `Bearer ${token}`,
      },
    }),

  customerLogin: (param: any, token: string) =>
    axios.post(`${baseURL}/customer/login`, param, {
      headers: {
        token: `Bearer ${token}`,
      },
    }),
};

export default customerService;
