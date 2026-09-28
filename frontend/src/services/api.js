import axios from "axios";

const API = axios.create({
  baseURL: "https://military-asset-management-6tlj.onrender.com/api/",
});

export default API;