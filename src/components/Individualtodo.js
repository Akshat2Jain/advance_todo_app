import React from "react";
import { FaTrashAlt } from "react-icons/fa";

export const IndividualTodo = ({ individualTodo,deleteTodo }) => {
  const handleDelete = (e) => {
    deleteTodo(individualTodo.id);
  };
  return (
    <div className="todo">
      <div>{individualTodo.Todo}</div>
      <div className="actions-div">
        <div className="delete-btn" onClick={handleDelete}>
          <FaTrashAlt />
        </div>
      </div>
    </div>
  );
};

export default IndividualTodo;
