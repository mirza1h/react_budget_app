import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';

const initialExpenses = localStorage.getItem('expenses') ?
  JSON.parse(localStorage.getItem('expenses')) : [];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);


  const handleCharge = e => {
    setCharge(e.target.value);
  }

  const handleAmount = e => {
    setAmount(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (charge && amount > 0) {
      if (edit) {
        expenses.map((expense) => {
          if (expense.id === id) {
            expense.charge = charge;
            expense.amount = amount;
          }
          return expense;
        })
        setExpenses(expenses);
        setEdit(false);
        handleAlert({ type: 'success', text: 'Item saved!' });
      }
      else
        setExpenses([...expenses, { id: uuidv4(), charge: charge, amount: amount }]);
      setCharge('');
      setAmount('');
      handleAlert({ type: 'success', text: 'Item added!' });
    } else {
      handleAlert({ type: 'danger', text: 'Fields must not be empty!' });
    }
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type: type, text: text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  }

  const handleDelete = (id) => {
    setExpenses(expenses.filter((expense) => {
      if (expense.id !== id)
        return true;
    }));
    handleAlert({ show: true, type: 'success', text: 'Item deleted!' });
  }

  const handleEdit = (id) => {
    let expense = expenses.find((item) => {
      if (item.id === id)
        return item;
    });
    setCharge(expense.charge);
    setAmount(expense.amount);
    setId(expense.id);
    setEdit(true);
  }

  const clearItems = () => {
    setExpenses([]);
    handleAlert({ show: true, type: 'success', text: 'Items deleted!' });
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>Total spending : <span className="total">
        ${expenses.reduce((accumulator, current) => {
          return accumulator += parseInt(current.amount);
        }, 0)} </span></h1>
    </>
  );
}

export default App;
