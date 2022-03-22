import React, { useState } from "react";
import TextArea from "./TextArea";
import TextInput from "./TextInput";

const FlashCardForm = ({ createMode = true }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const backgroundClassName = createMode ? "bg-green-100" : "bg-yellow-100";

  const textInputHandler = (flashCardTitle) => {
    setTitle(flashCardTitle);
  };

  const textAreaHandler = (flashCardDescription) => {
    setDescription(flashCardDescription);
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
    </form>
  );
};

export default FlashCardForm;
