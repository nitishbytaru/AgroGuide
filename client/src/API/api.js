import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

async function apiRequest(
  method,
  endpoint,
  data = null,
  contentType = "application/json"
) {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      headers: { "Content-Type": contentType },
      withCredentials: true,
    });
    console.log("------------------------------");
    console.log(response);
    console.log("------------------------------");
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const cropSuggestions = (data) =>
  apiRequest("post", "/crop/result", data);
export const yieldPrediction = (data) =>
  apiRequest("post", "/yield/result", data);
export const suppliments = () => apiRequest("get", "/market");
export const diseaseDetection = (data) => {
  for (let [key, value] of data.entries()) {
    console.log(`${key}: ${value}`);
  }
  return apiRequest("post", "/disease/result", data, "application/form-data");
};
