import axios from "axios";

const BASE_URL = "http://numbersapi.com";

export const getTriviaFact = async (num: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${num}`, {
      headers: {
        Accept: "*/*",
        Origin: "http://numbersapi.com",
        Referer: "http://numbersapi.com",
      },
    });
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
