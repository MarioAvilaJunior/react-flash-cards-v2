import { getNewId } from "../services/idService";

export default function TextArea({
  labelDescription = "Descrição do label:",
  inputValue = "Valor padrão do input",
  onInputChange = null,
  id = getNewId(),
  autoFocus = false,
  rows = 3,
  maxLength = 230,
}) {
  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      const newValue = currentTarget.value;
      onInputChange(newValue);
    }
  }

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>

      <textarea
        id={id}
        className="border p-1"
        maxLength={maxLength}
        rows={rows}
        autoFocus={autoFocus}
        value={inputValue}
        onChange={handleInputChange}
      />
      <div></div>
    </div>
  );
}
