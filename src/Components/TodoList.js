import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import axios from "axios";

export const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const taskList = () =>
    axios
      .get(
        `http://localhost:4000/list`
      )
      .then((response) => {
        // console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  useEffect(() => {
    taskList();
  }, []);

  const addTodo = (todo) => {
    axios
      .post('http://localhost:4000/create', { title: todo })
      .then((response) => {
        // console.log(response.data);
        taskList();
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }

  const toDone = (id) => {
    axios
      .post('http://localhost:4000/done', { id: id, status: false })
      .then((response) => {
        // console.log(response.data);
        taskList();
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }

  const restoreTask = (id) => {
    axios
      .post('http://localhost:4000/done', { id: id, status: true })
      .then((response) => {
        // console.log(response.data);
        taskList();
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: todo.status } : todo
      )
    );
  }

  const editTask = (newTitle, id) => {
    axios
      .post('http://localhost:4000/update', { id: id, title: newTitle })
      .then((response) => {
        // console.log(response.data);
        taskList();
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const deleteTodo = (id) => {
    console.log(id);
    axios
      .delete('http://localhost:4000/delete/' + id)
      .then((response) => {
        // console.log(response.data);
        taskList();
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    // setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="todo-outmost">
      <h1>Things to Do</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            editTodo={editTodo}
            toDone={toDone}
            restoreTask={restoreTask}
            deleteTodo={deleteTodo}
          />
        )
      )}
    </div>
  );
};
