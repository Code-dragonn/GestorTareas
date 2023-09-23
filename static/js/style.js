document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const modal = document.getElementById('modalBox');
    const addNotesButton = document.querySelector('.addNoteButtonToDo');
    const cancelButton = document.querySelector('#btnModalCancel');
    const titleInput = document.getElementById("modalTitle");
    const descriptionInput = document.getElementById("modalDescription");
    const saveButton = document.getElementById("btnModalSave");
    const trashButton = document.getElementById("trashBtn");

    // Global variable for the note being edited
    let editingNote = null;

    // Class to create note objects
    class Note {
        constructor(title, description, state) {
            this.title = title;
            this.description = description;
            this.state = state;
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
        // Clean up the note in editing
        editingNote = null;
    }

    // Function to create a new note or update the editing note
    function createNote() {
        const title = titleInput.value;
        const description = descriptionInput.value;

        if (!title || !description) {
            alert("Please fill in both the title and description of the note.");
            return;
        }

        if (editingNote) {
            // If there is a note in edit, update it instead of creating a new one
            editingNote.title = title;
            editingNote.description = description;
            // Update the view of the edited note
            const noteElement = document.querySelector(`[data-title="${editingNote.title}"]`);
            if (noteElement) {
                noteElement.querySelector("p").textContent = editingNote.title;
            } else {
                alert('Cannot change title, try again.');
            }
        } else {
            const newNote = new Note(title, description, "to-do");

            // Update the graphical interface
            const newNoteElement = createNoteElement(newNote);
            const todoSection = document.querySelector('[data-state="to-do"]');
            todoSection.appendChild(newNoteElement);
        }

        // Clear the modal fields
        titleInput.value = "";
        descriptionInput.value = "";

        // Hide the modal after creating/editing the note
        hideModal();
    }

    // Function to create a note element in the DOM
    function createNoteElement(note) {
        const newNoteElement = document.createElement("article");
        newNoteElement.classList.add("notes");
        newNoteElement.setAttribute("data-title", note.title);
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
        // Reset editingNote
        editingNote = note;
    }

    // Associate the createNote function with the "Save" button in the modal
    saveButton.addEventListener("click", createNote);

    // Associate the hideModal function with the "Cancel" button in the modal
    cancelButton.addEventListener("click", hideModal);

    // Function to move a note to the next section
    function moveNoteToNextSection() {
        if (editingNote) {
            const currentState = editingNote.state;
            let nextState = "";

            switch (currentState) {
                case "to-do":
                    nextState = "in-progress";
                    break;
                case "in-progress":
                    nextState = "done";
                    break;
                default:
                    alert("Invalid state.");
                    return;
            }

            editingNote.state = nextState;
            // Update the view of the edited note
            const noteElement = document.querySelector(`[data-title="${editingNote.title}"]`);
            if (noteElement) {
                const currentSection = noteElement.closest(".backBlog");
                currentSection.removeChild(noteElement);

                const nextSection = document.querySelector(`[data-state="${nextState}"]`);
                nextSection.appendChild(noteElement);
                hideModal();
            } else {
                alert('Invalid action, try again.');
            }
        }
    }

    // Associate the moveNoteToNextSection function with the "Next" button in the modal
    const nextButton = document.getElementById("nextBtn");
    nextButton.addEventListener("click", moveNoteToNextSection);

    // Function to move a note to the previous section
    function moveNoteToPreviousSection() {
        if (editingNote) {
            const currentState = editingNote.state;
            let previousState = "";

            switch (currentState) {
                case "in-progress":
                    previousState = "to-do";
                    break;
                case "done":
                    previousState = "in-progress";
                    break;
                default:
                    alert("Invalid state.");
                    return;
            }

            editingNote.state = previousState;
            // Update the view of the edited note
            const noteElement = document.querySelector(`[data-title="${editingNote.title}"]`);
            if (noteElement) {
                const currentSection = noteElement.closest(".backBlog");
                currentSection.removeChild(noteElement);

                const previousSection = document.querySelector(`[data-state="${previousState}"]`);
                previousSection.appendChild(noteElement);
                hideModal();
            } else {
                alert('Invalid action, try again.');
            }
        }
        
    }

    // Associate the moveNoteToPreviousSection function with the "Back" button in the modal
    const backButton = document.getElementById("backTask");
    backButton.addEventListener("click", moveNoteToPreviousSection);

    
    trashButton.addEventListener("click", deleteNote);
    function deleteNote() {
       
        if (confirm("Are you sure you want to delete this task")) {
            
    
            // Find and remove the task in the DOM
    const noteElement = document.querySelector(`[data-title="${titleInput.value}"]`);
            if (noteElement) {
                noteElement.remove();
            } else {
                alert('the note to be deleted was not found');
            }
        }
        hideModal();
        titleInput.value = "";
        descriptionInput.value = "";
    }
});