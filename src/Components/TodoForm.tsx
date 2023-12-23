import React, { useState } from 'react'

export const TodoForm = ({ addTodo }: any) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (value) {
      addTodo(value);
      setValue('');
    }
  };

  const placeHolder = `What's your plan?`;
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder={placeHolder} />
      <button type="submit" className='todo-btn'>Add</button>
    </form>
  )
}
