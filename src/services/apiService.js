import { get } from "./httpService";

const BACK_END_URL = "http://localhost:3001/flashcards";

const apiGetAllFlashCards = async () => {
  const allFlashCards = await get(BACK_END_URL);
  return allFlashCards;
};

export { apiGetAllFlashCards };
