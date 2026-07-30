import axios from "axios";

export const httpClient = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de requests
httpClient.interceptors.request.use((config) => {
  console.log("➡️ API Request:", config.url);
  return config;
} );

// Interceptor de responses
httpClient.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.config.url);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);