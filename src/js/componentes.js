
import {Todo} from '../classes';
import {todoList} from '../index';

//REFERENCIAS

/* Creating references to the divTodoList and the txtInput. */
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnDeleteAllCompleted = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFriltros = document.querySelectorAll('.filtro');



export const createTodoHtml = (todo)=>{

    const htmlTodo = 
    `<li class="${(todo.completed) ? 'completed' : ''}" data-id="${todo.id}">
         <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completed) ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`
    
    const div = document.createElement('div');
    
    
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}


//EVENTOS

/* Listening for a keyup event on the input field. If the keycode is 13 (enter) and the value of the
input field is greater than 0, it creates a new todo, adds it to the todo list, creates the html for
the todo, and clears the input field. */
txtInput.addEventListener('keyup', (event)=>{

    if(event.keyCode == 13 && txtInput.value.length > 0){

        const newTodo = new Todo(txtInput.value);
        todoList.newTodo(newTodo);

        createTodoHtml(newTodo);
        txtInput.value = '';
    }
});


divTodoList.addEventListener('click', (event)=>{

    const elementName = event.target.localName; //input, label, button
    const elementTodo = event.target.parentElement.parentElement;
    const todoId      = elementTodo.getAttribute('data-id');
    

  
    if(elementName.includes('input')){
        
        todoList.markCompleted(todoId);
        elementTodo.classList.toggle('completed');
    
    }else if(elementName.includes('button')){

        todoList.deleteTodo(todoId);
        divTodoList.removeChild(elementTodo);
    }
    
});

btnDeleteAllCompleted.addEventListener('click', ()=> {

    todoList.deleteCompleted();

    for(let i = divTodoList.children.length-1; i >= 0; i-- ){

        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){

            divTodoList.removeChild(elemento);

        }

    }

});

ulFiltros.addEventListener('click', (event)=> {

    const filtro = event.target.text;

    if( !filtro ) { return; }

    anchorFriltros.forEach( elem => elem.classList.remove( 'selected' ));
    event.target.classList.add('selected');

    
    for(const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ){

            case 'Pendientes':
                if( completado ){

                    elemento.classList.add('hidden');

                }
            break;

            case 'Completados':
                if( !completado ){

                    elemento.classList.add('hidden');
                }
            break;

        }

    }

})