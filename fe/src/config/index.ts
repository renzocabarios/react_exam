import axios from "axios";

export const AXIOS_INSTANCE = axios.create({
  baseURL: "http://localhost:9000/api/v1/",
});

export const get = async (url: string) => {
  return await AXIOS_INSTANCE.get("http://localhost:9000/api/v1/" + url);
};

export const post = async (url: string, body: any) => {
  return await AXIOS_INSTANCE.post("http://localhost:9000/api/v1/" + url, body);
};
