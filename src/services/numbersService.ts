import axios from "axios";

const BASE_URL = "http://numbersapi.com";

export const fetchData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/5/math`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};
