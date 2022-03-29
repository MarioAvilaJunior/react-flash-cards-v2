import { deleteData, getData, postData, putData } from "./httpService";
import { getNewId } from "./idService";

const apiGetAllFlashCards = async () => {
  const allFlashCards = await getData("/flashcards");
  return allFlashCards;
};

const apiDeleteFlashCard = async (cardId) => {
  await deleteData(`/flashcards/${cardId}`);
};

const apiPostFlashCard = async (title, description) => {
  const newFlashCard = postData("/flashcards", {
    id: getNewId(),
    title,
    description,
  });
  return newFlashCard;
};

const apiPutFlashCard = async (cardId, title, description) => {
  const updatedFlashCard = putData(`/flashcards/${cardId}`, {
    title,
    description,
  });
  return updatedFlashCard;
};

export {
  apiDeleteFlashCard,
  apiGetAllFlashCards,
  apiPostFlashCard,
  apiPutFlashCard,
};
