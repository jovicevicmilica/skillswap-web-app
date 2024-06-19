import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/home-page",
  withCredentials: true, //uključivanje kolačića, HTTP autentifikacije, ...
});