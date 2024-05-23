//axios za admin stranu
import axios from "axios";

export const makeAdminRequest = axios.create({
  baseURL: "http://localhost:8800/api/admin",
  withCredentials: true,
});