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

export const getTriviaFact = async (num: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${num}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

export const getMathFact = async (num: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${num}/math`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};
