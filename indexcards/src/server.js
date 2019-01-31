import axios from "axios";

export function indexCard_getAll() {
  return axios.get("/api/indexcards").then(resp => resp.data);
}

export async function indexCard_getAll_async() {
  const resp = await axios.get("/api/indexcards");
  return resp.data;
}

export async function indexCard_update_async(id, req) {
  const resp = await axios.put("/api/indexcards/" + id, req);
  return resp;
}

export function indexCard_getRandom() {
  return axios.get("/api/indexcards/random").then(resp => resp.data);
}
