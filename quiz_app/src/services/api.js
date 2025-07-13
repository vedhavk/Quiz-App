import axios from "axios";

// Make sure the backend is running on this port
const API_BASE_URL = "http://localhost:5000/api";

// Add request interceptor for debugging
axios.interceptors.request.use((request) => {
  console.log("Starting Request:", request.url);
  return request;
});

// Add response interceptor for debugging
axios.interceptors.response.use(
  (response) => {
    console.log("Response:", response.data);
    return response;
  },
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

export const fetchQuestion = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/questions/random`);
    return response.data;
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
};

export const submitAnswer = async (questionId, selectedAnswer) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/questions/${questionId}/submit`,
      {
        selectedAnswer,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting answer:", error);
    throw error;
  }
};
