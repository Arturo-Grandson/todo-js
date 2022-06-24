import './styles.css';
/* import { Todo } from './classes/todo.class';
import { TodoList } from './classes/todo-list.class'; */

import {Todo, TodoList} from './classes'
import { createTodoHtml } from './js/componentes';


export const todoList = new TodoList();

todoList.todos.forEach(todo => createTodoHtml(todo));


/* const tarea    = new Todo('Aprender js');

console.log(tarea); */

/* todoList.newTodo(tarea);


console.log(todoList);

createTodoHtml(tarea);

localStorage.setItem('my-key', 'ABC123');
sessionStorage.setItem('my-key', 'ABC123');

setTimeout(()=>{

    localStorage.removeItem('my-key');

}, 1500); */


