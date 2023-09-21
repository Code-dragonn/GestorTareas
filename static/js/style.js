const modal = document.getElementById('modalBox');
const notesElements = document.querySelectorAll('.notes');
const notesAdd = document.querySelectorAll('.addNotes');
const cancelButton = document.querySelector('#btnModalBox');
//! necessary elements 

const addTaskButton = document.getElementById("btnColorBoxModal");
const newTaskTitle = document.getElementById("contentTittle");
const newTaskDescription = document.getElementById("contentDescription");
const toDoList = document.querySelector(".backBlog");
 
// ! necessary to add task

const addNotesElement = document.getElementById("addNotes");
const backBlogSection = document.querySelector(".backBlog");
// ! necessary to move addNotes element to the end of backBlog

//? create modal
notesElements.forEach((notesElement) => {
    notesElement.addEventListener('click', () => {
        modal.style.display = 'grid';
    });
});

notesAdd.forEach((notesAdd) => {
    notesAdd.addEventListener('click',()=>{
        modal.style.display = 'grid';
    })
});
// ! end create modal

// ? closet modal
cancelButton.addEventListener('click', () => {
    modal.style.display = 'none';
});
// ! closet modal

// ? create add task
function addTask() {
    const taskTextTitle = newTaskTitle.value;
    const taskTextDescription = newTaskDescription.value;
   
    if (taskTextTitle.trim() !== "") {
        const taskItem = document.createElement("article");
        taskItem.classList.add("notes");

        // Create the element title
        const taskText = document.createElement("p");
        taskText.textContent = taskTextTitle;
        taskItem.appendChild(taskText);

        // Create the imgEdit element
        const imgEditFigure = document.createElement("figure");
        imgEditFigure.classList.add("imgEdit");
        const imgEditImage = document.createElement("img");
        imgEditImage.src = "static/img/edit.svg";
        imgEditImage.alt = "Edit";
        imgEditFigure.appendChild(imgEditImage);
        taskItem.appendChild(imgEditFigure);

        // Adds the click event to the imgEdit element to display the modal
        imgEditFigure.addEventListener('click', () => {
            modal.style.display = 'grid';
            newTaskTitle.value = taskTextTitle;
            newTaskDescription.value = taskTextDescription;
        });

        toDoList.appendChild(taskItem);
        newTaskTitle.value = "";
        newTaskDescription.value = "";
        modal.style.display = 'none';
    }
    moveAddNotesToBottom();
}

// Add a click event to the "Save" button to call the addTask function.
addTaskButton.addEventListener("click", addTask);
// ! closed add task

// ? move addNotes element to the end 
function moveAddNotesToBottom() {
    backBlogSection.appendChild(addNotesElement);
}
// ! move addNotes element to the end 