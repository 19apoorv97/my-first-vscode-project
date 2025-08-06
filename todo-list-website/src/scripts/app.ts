// This file contains the TypeScript code for the todo list functionality.
// It exports functions to add, remove, and display todo items.
// It may also include event listeners for user interactions.

interface TodoItem {
    id: number;
    task: string;
    completed: boolean;
}

let todos: TodoItem[] = [];
let nextId: number = 1;

function addTodo(task: string): void {
    const newTodo: TodoItem = {
        id: nextId++,
        task: task,
        completed: false,
    };
    todos.push(newTodo);
    displayTodos();
}

function removeTodo(id: number): void {
    todos = todos.filter(todo => todo.id !== id);
    displayTodos();
}

function toggleTodoCompletion(id: number): void {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        displayTodos();
    }
}

function displayTodos(): void {
    const todoList = document.getElementById('todo-list');
    if (todoList) {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.textContent = todo.task;
            todoItem.className = todo.completed ? 'line-through' : '';
            todoItem.addEventListener('click', () => toggleTodoCompletion(todo.id));
            todoList.appendChild(todoItem);
        });
    }
}

document.getElementById('add-todo-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.getElementById('todo-input') as HTMLInputElement;
    if (input.value) {
        addTodo(input.value);
        input.value = '';
    }
});