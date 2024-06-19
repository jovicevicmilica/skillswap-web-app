//axios za admin stranu
import axios from "axios";

export const makeAdminRequest = axios.create({ //za lakše podnošenje zahtjeva, da ne kucam cio link uvijek
  baseURL: "http://localhost:8800/api/admin",
  withCredentials: true, //uključivanje kolačića, HTTP autentifikacije, ...
});