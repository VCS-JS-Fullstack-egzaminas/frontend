import axios from "../utils/axios";

export const uploadImg = async (data) => {
    return axios.post("/uploads/images", data);
  };