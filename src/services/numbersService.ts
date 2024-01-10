import axios from "axios";

const BASE_URL = "https://numbersapi.com";

export const getTriviaFact = async (num: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${num}`, {
      headers: {
        accept: "*/*",
        host: "numbersapi.com",
        origin: "https://numbersapi.com",
        referer: "https://numbersapi.com",
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
