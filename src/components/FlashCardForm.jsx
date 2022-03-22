import React, { useState } from "react";
import Button from "./Button";
import TextArea from "./TextArea";
import TextInput from "./TextInput";

const FlashCardForm = ({ createMode = true, onPersist = null }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const backgroundClassName = createMode ? "bg-green-100" : "bg-yellow-100";

  const textInputHandler = (flashCardTitle) => {
    setTitle(flashCardTitle);
  };

  const textAreaHandler = (flashCardDescription) => {
    setDescription(flashCardDescription);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (onPersist) {
      onPersist(createMode, title, description);
    }
    formResetHandler();
  };

  const formResetHandler = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <form className={`${backgroundClassName} p-4`}>
      <h2 className="text-center font-semibold">Manutenção de Flash Cards</h2>
      <TextInput
        labelDescription="Título"
        inputValue={title}
        onInputChange={textInputHandler}
      />
      <TextArea
        labelDescription="Descrição"
        inputValue={description}
        onInputChange={textAreaHandler}
      ></TextArea>

      <div className="flex items-center justify-end">
        <Button
          colorClass="bg-red-200"
          type="reset"
          onButtonClick={formResetHandler}
        >
          Limpar
        </Button>
        <Button
          colorClass="bg-green-300"
          type="submit"
          onButtonClick={formSubmitHandler}
        >
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default FlashCardForm;
