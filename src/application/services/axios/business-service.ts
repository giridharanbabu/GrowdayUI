import axios from "axios";

const baseURL = "https://growday.onrender.com";

const businessService = {
  saveBusiness: (param: any, token: string) =>
    axios.post(`${baseURL}/business/register`, param, {
      headers: {
        token: `Bearer ${token}`,
      },
    }),

  getBusinesses: (param: any, token: string) =>
    axios.get(`${baseURL}/list?collection_name=business`, {
      headers: {
        token: `Bearer ${token}`,
      },
    }),

  editBusiness: (param: any, token: string) =>
    axios.post(`${baseURL}/edit/business`, param, {
      headers: {
        token: `Bearer ${token}`,
      },
    }),

  changeBusinessStatus: (param: any, token: string) =>
    axios.post(`${baseURL}/disable/business`, param, {
      headers: {
        token: `Bearer ${token}`,
      },
    }),

  getBusinessByID: (businessId: string, token: string) =>
    axios.get(`${baseURL}/business/${businessId}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    }),
};

export default businessService;
