import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons'
export const Todo = ({ task, editTodo, toDone, restoreTask, deleteTodo }: any) => {

  return (
    <div className="todo-item">
      <p className={`${task.status ? '' : 'done'}`} onClick={() => toDone(task.id)}>{task.title}</p>
      <div>
        {task.status ? <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)} /> : null}
        {!task.status ? <FontAwesomeIcon icon={faRefresh} onClick={() => restoreTask(task.id)} /> : null}
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  )
}
