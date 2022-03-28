import React, { useEffect, useState } from "react";
import Button from "./Button";
import TextArea from "./TextArea";
import TextInput from "./TextInput";
import Error from "./Error";

const FlashCardForm = ({
  createMode = true,
  onPersist = null,
  children: flashCard,
}) => {
  const [title, setTitle] = useState(flashCard?.title || "");
  const [description, setDescription] = useState(flashCard?.description || "");
  const backgroundClassName = createMode ? "bg-green-100" : "bg-yellow-100";
  const [error, setError] = useState("");

  useEffect(() => {
    if (createMode) {
      setTitle("");
      setDescription("");
    } else {
      setTitle(flashCard?.title || "");
      setDescription(flashCard?.description || "");
    }
  }, [createMode, flashCard]);

  const textInputHandler = (flashCardTitle) => {
    setTitle(flashCardTitle);
  };

  const textAreaHandler = (flashCardDescription) => {
    setDescription(flashCardDescription);
  };

  const validateForm = () => {
    return title.trim() !== "" && description.trim() !== "";
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setError("");

      if (onPersist) {
        onPersist(title, description);
        formResetHandler();
      }
    } else {
      setError("O preenchimento de título e descrição são obrigatórios");
    }
  };

  const formResetHandler = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <form className={`${backgroundClassName} p-4`} onSubmit={formSubmitHandler}>
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

      <div className="flex items-center justify-between">
        {error.trim() !== "" ? <Error>{error}</Error> : <span>&nbsp;</span>}
        <div>
          <Button
            colorClass="bg-red-200"
            type="reset"
            onButtonClick={formResetHandler}
          >
            Limpar
          </Button>
          <Button colorClass="bg-green-300" type="submit">
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FlashCardForm;
