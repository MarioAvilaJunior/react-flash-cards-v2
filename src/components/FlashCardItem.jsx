import {
  AiOutlineEdit as EditIcon,
  AiOutlineDelete as DeleteIcon,
} from "react-icons/ai";

const FlashCardItem = ({
  children: flashCard,
  onDelete = null,
  onEdit = null,
}) => {
  const { title, description } = flashCard;

  const handleDeleteIconClick = () => {
    if (onDelete) {
      onDelete(flashCard.id);
    }
  };

  const handleEditIconClick = () => {
    if (onEdit) {
      onEdit(flashCard);
    }
  };

  return (
    <div className="border p-2 m-2">
      <ul className="flex flex-col space-y-4">
        <li>
          <strong>Título: </strong>
          <span>{title}</span>
        </li>
        <li>
          <strong>Descrição: </strong>
          <span>{description}</span>
        </li>
      </ul>
      <div className="mt-4 flex flex-row items-center justify-end space-x-4">
        <EditIcon
          className="cursor-pointer"
          onClick={handleEditIconClick}
          size={24}
        />
        <DeleteIcon
          className="cursor-pointer"
          onClick={handleDeleteIconClick}
          size={24}
        />
      </div>
    </div>
  );
};

export default FlashCardItem;
