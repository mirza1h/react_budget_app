import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

function ExpenseItem({ expense, handleDelete, handleEdit }) {
  const { id, charge, amount } = expense;
  return (
    <li id={id} className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">${amount}</span>
      </div>
      <div>
        <button onClick={() => handleEdit(id)} className="edit-btn" aria-label="edit">
          <MdEdit />
        </button>
        <button onClick={() => handleDelete(id)} className="clear-btn" aria-label="delete">
          <MdDelete />
        </button>
      </div>
    </li>
  );
}

export default ExpenseItem;