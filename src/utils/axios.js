import axios from "axios";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://141.136.44.49:3000";

export default axios.create({
  withCredentials: true,
  baseURL: `${BACKEND_URL}/api`,
});
