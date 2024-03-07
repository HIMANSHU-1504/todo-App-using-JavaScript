const mainTodoElem = document.querySelector(".todo-list-elem");
const inputValue = document.getElementById("inputValue");

const getTodoListFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("todoList"));
};

let localTodoList = getTodoListFromLocalStorage() || [];

// Function to add a single ToDo element dynamically
const addTodoDynamicElement = (todoText) => {
    const divElement = document.createElement("div");
    divElement.classList.add("main_todo_div");
    divElement.innerHTML = `<li>${todoText}</li> <button class="deleteBtn">Delete</button>`;
    mainTodoElem.append(divElement);
};

// Function to add a ToDo element to the list
const addTodoList = (e) => {
    e.preventDefault();

    const todoListValue = inputValue.value.trim();

    inputValue.value = "";

    if (todoListValue !== '' && !localTodoList.includes(todoListValue)) {
        localTodoList.push(todoListValue);
        localTodoList = [...new Set(localTodoList)];
        localStorage.setItem("todoList" ,JSON.stringify(localTodoList));
        addTodoDynamicElement(todoListValue); // Add the ToDo dynamically
        inputValue.value = ''; // Clear the input field
    }
};

// Function to show existing ToDo list
const showTodoList = () => {
    localTodoList.forEach((todoText) => {
        addTodoDynamicElement(todoText);
    });
};

// Show existing ToDo list on page load
showTodoList();

const removeTodoElem = (e) => {
    // our main focus is on getting the element li by clicking the delete button
    const todoToRemove = e.target.parentElement;
    let todoListContent = todoToRemove.querySelector('li').innerText;

    localTodoList = localTodoList.filter((curTodo) => {
        return curTodo !== todoListContent;
    });

    todoToRemove.remove(); 
    localStorage.setItem("todoList" ,JSON.stringify(localTodoList)); // Update the local storage
};

mainTodoElem.addEventListener("click", (e) => {
    if (e.target.classList.contains('deleteBtn')) {
        e.preventDefault();
        removeTodoElem(e);
    }
});

// Event listener for adding ToDo on button click
document.querySelector(".btn").addEventListener("click", (e) => {
    addTodoList(e);
});