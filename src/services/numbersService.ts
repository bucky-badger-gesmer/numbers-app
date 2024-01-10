import axios from "axios";

const BASE_URL = "https://numbersapi.p.rapidapi.com";

const fetchData = async (
  num: number,
  endpoint: "trivia" | "math" | "date" | "year"
) => {
  try {
    const response = await axios.get(`${BASE_URL}/${num}/${endpoint}`, {
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_TOKEN,
        "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
      },
    });

    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

export const getTriviaFact = async (num: number) => {
  return fetchData(num, "trivia");
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
