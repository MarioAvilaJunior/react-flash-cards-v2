import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Button from "../components/Button";
import FlashCard from "../components/FlashCard";
import FlashCards from "../components/FlashCards";
import Header from "../components/Header";
import Main from "../components/Main";
import RadioButton from "../components/RadioButton";
import Loading from "../components/Loading";
import {
  apiDeleteFlashCard,
  apiGetAllFlashCards,
  apiPostFlashCard,
  apiPutFlashCard,
} from "../services/apiService";
import { helperShuffleArray } from "../helpers/arrayHelpers";
import Error from "../components/Error";
import FlashCardItem from "../components/FlashCardItem";
import FlashCardForm from "../components/FlashCardForm";
import { getNewId } from "../services/idService";
import { postData } from "../services/httpService";

export default function FlashCardsPage() {
  const [allCards, setAllCards] = useState([]);
  const [studyCards, setStudyCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createMode, setCreateMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFlashCard, setSelectedFlashCard] = useState(0);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

  useEffect(() => {
    /*apiGetAllFlashCards().then((allFlashCards) => {
      setAllCards(allFlashCards);
    });*/
    // IIFE
    (async () => {
      try {
        const backEndAllCards = await apiGetAllFlashCards();
        setAllCards(backEndAllCards);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    })();
    /*  async function getAllCards() {
      const backEndAllCards = await apiGetAllFlashCards();
      setAllCards(backEndAllCards);
    }

    getAllCards();*/
  }, []);

  function handleButtonClick() {
    const shuffledCards = helperShuffleArray(studyCards);

    setStudyCards(shuffledCards);
  }

  function handleRadioShowDescriptionClick() {
    // prettier-ignore
    const updatedCards = 
      [...studyCards].map(card => ({...card, showTitle: false}));

    setStudyCards(updatedCards);
    setRadioButtonShowTitle(false);
  }

  useEffect(() => {
    setStudyCards(
      allCards.map((flashCard) => ({ ...flashCard, showTitle: true }))
    );
  }, [allCards]);

  function handleRadioShowTitleClick() {
    // prettier-ignore
    const updatedCards = 
      [...studyCards].map(card => ({...card, showTitle: true}));

    setStudyCards(updatedCards);

    setRadioButtonShowTitle(true);
  }

  function handleToggleFlashCard(cardId) {
    const updatedCards = [...studyCards];
    const cardIndex = updatedCards.findIndex((card) => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;

    setStudyCards(updatedCards);
  }

  const deleteHandler = async (flashCardId) => {
    try {
      // Back End
      await apiDeleteFlashCard(flashCardId);

      // Front End
      setAllCards(allCards.filter((card) => card.id !== flashCardId));
    } catch (error) {
      setError(error.message);
    }
  };
  const editHandler = (flashCard) => {
    setCreateMode(false);
    setSelectedTab(1);
    setSelectedFlashCard(flashCard);
  };

  const tabSelectHandler = (tabIndex) => {
    setSelectedTab(tabIndex);
  };

  const newFlashCardHandler = () => {
    setCreateMode(true);
    setSelectedFlashCard(null);
  };

  const persistHandler = async (title, description) => {
    if (createMode) {
      try {
        // Back End
        const newFlashCard = await apiPostFlashCard(title, description);
        // Front End
        setAllCards([...allCards, newFlashCard]);

        setError("");
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        // Back End
        const UpdatedFlashCard = await apiPutFlashCard(
          selectedFlashCard.id,
          title,
          description
        );

        //Front End
        setAllCards(
          allCards.map((flashCard) => {
            if (flashCard.id === selectedFlashCard.id) {
              //return { ...flashCard, title, description };
              return UpdatedFlashCard;
            }
            return flashCard;
          })
        );
        setSelectedFlashCard(null);
        setCreateMode(true);
        setError("");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading && !error) {
    mainJsx = (
      <>
        <div className="text-center mb-4">
          <Button onButtonClick={handleButtonClick}>Embaralhar cards</Button>
        </div>

        <div className="flex flex-row items-center justify-center space-x-4 m-4">
          <RadioButton
            id="radioButtonShowTitle"
            name="showInfo"
            buttonChecked={radioButtonShowTitle}
            onButtonClick={handleRadioShowTitleClick}
          >
            Mostrar título
          </RadioButton>

          <RadioButton
            id="radioButtonShowDescription"
            name="showInfo"
            buttonChecked={!radioButtonShowTitle}
            onButtonClick={handleRadioShowDescriptionClick}
          >
            Mostrar descrição
          </RadioButton>
        </div>

        <FlashCards>
          {studyCards.map(({ id, title, description, showTitle }) => {
            return (
              <FlashCard
                key={id}
                id={id}
                title={title}
                description={description}
                showFlashCardTitle={showTitle}
                onToggleFlashCard={handleToggleFlashCard}
              />
            );
          })}
        </FlashCards>
      </>
    );
  }

  return (
    <>
      <Header>react-flash-cards-v2</Header>
      <Tabs onSelect={tabSelectHandler} selectedIndex={selectedTab}>
        <TabList>
          <Tab>Listagem</Tab>
          <Tab>Cadastro</Tab>
          <Tab>Estudo</Tab>
        </TabList>

        <TabPanel>
          {allCards.map((flashCard) => {
            return (
              <FlashCardItem
                key={flashCard.id}
                onEdit={editHandler}
                onDelete={deleteHandler}
              >
                {flashCard}
              </FlashCardItem>
            );
          })}
        </TabPanel>
        <TabPanel>
          <Button onButtonClick={newFlashCardHandler}>Novo Flash Card</Button>
          <FlashCardForm createMode={createMode} onPersist={persistHandler}>
            {selectedFlashCard}
          </FlashCardForm>
        </TabPanel>
        <TabPanel>
          <Main>{mainJsx}</Main>
        </TabPanel>
      </Tabs>
    </>
  );
}
