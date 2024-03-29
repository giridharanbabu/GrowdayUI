import axios from "axios";

const baseURL = "https://growday.onrender.com";

const memberService = {
  //post
  registerMember: (param: any, token: string) =>
    axios.post(`${baseURL}/member/register`, param, {
      headers: {
        token: `Bearer ${token}`,
      },
    }),

  //post
  editMember: (param: any, token: string) =>
    axios.post(`${baseURL}/edit/member`, param, {
      headers: {
        token: `Bearer ${token}`,
      },
    }),

  //get
  fetchMember: (param: any, token: string) =>
    axios.get(`${baseURL}/list?collection_name=members`, {
      headers: {
        token: `Bearer ${token}`,
      },
    }),
};

export default memberService;
