import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
});

const getData = async (url) => {
  const { data } = await axiosInstance.get(url);
  return data;
};

const deleteData = async (url) => {
  await axiosInstance.delete(url);
};

const postData = async (url, object) => {
  const { data } = await axiosInstance.post(url, object);
  return data;
};

const putData = async (url, object) => {
  const { data } = await axiosInstance.put(url, object);
  return data;
};

export { deleteData, getData, postData, putData };
