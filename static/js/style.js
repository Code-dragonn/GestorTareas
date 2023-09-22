document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const modal = document.getElementById('modalBox');
    const addNotesButton = document.querySelector('.addNoteButtonToDo');
    const cancelButton = document.querySelector('#btnModalCancel');
    const titleInput = document.getElementById("modalTitle");
    const descriptionInput = document.getElementById("modalDescription");
    const saveButton = document.getElementById("btnModalSave");

    // Class to create note objects
    class Note {
        constructor(title, description) {
            this.title = title;
            this.description = description;
        }
    }

    addNotesButton.addEventListener("click", showModal);

    // Function to display the modal
    function showModal() {
        modal.style.display = 'grid';
    }

    // Function to hide the modal
    function hideModal() {
        modal.style.display = 'none';
    }

    // Function to create a new note and add it to "toDo"
    function createNote() {
        const title = titleInput.value;
        const description = descriptionInput.value;

        if (!title || !description) {
            alert("Please fill in both the title and description of the note.");
            return;
        }

        const newNote = new Note(title, description);

        // Update the graphical interface
        const newNoteElement = createNoteElement(newNote);
        const todoSection = document.querySelector('[data-state="to-do"]');
        todoSection.appendChild(newNoteElement);

        // Clear the modal fields
        titleInput.value = "";
        descriptionInput.value = "";

        // Hide the modal after creating the note
        hideModal();
    }

    // Function to create a note element in the DOM
    function createNoteElement(note) {
        const newNoteElement = document.createElement("article");
        newNoteElement.classList.add("notes");
        newNoteElement.innerHTML = `
            <p>${note.title}</p>
            <figure class="imgEdit">
                <img src="static/img/edit.svg" alt="">
            </figure>
        `;

        // Add an event listener to show the modal when clicking on the note
        newNoteElement.addEventListener("click", () => {
            showNoteInfo(note);
        });

        return newNoteElement;
    }

    // Function to display the note information in the modal
    function showNoteInfo(note) {
        modal.style.display = 'grid';
        titleInput.value = note.title;
        descriptionInput.value = note.description;
    }

    // Associate the createNote function with the "Save" button in the modal
    saveButton.addEventListener("click", createNote);

    // Associate the hideModal function with the "Cancel" button in the modal
    cancelButton.addEventListener("click", hideModal);
});
