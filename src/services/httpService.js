import axios from "axios";

const get = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export { get };
