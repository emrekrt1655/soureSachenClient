import axios from "axios";
const token = `${localStorage.getItem('logged')}`
export const postAPI = async (url, post) => {
  console.log(token)
  const res = await axios.post(`/api/${url}`, post, {
    headers: { token: token },
  });

  return res;
};


export const getAPI = async (url, token) => {
  const res = await axios.get(`/api/${url}`, {
    headers: { token: `${localStorage.getItem('logged')}` },
  });

  return res;
};

export const putAPI = async (url, post) => {
  const res = await axios.put(`/api/${url}`, post, {
    
    headers: { token: token },
  });

  return res;
};
