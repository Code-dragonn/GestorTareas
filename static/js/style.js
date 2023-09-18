const modal = document.getElementById('modalBox');
const notesElements = document.querySelectorAll('.notes');
const notesAdd = document.querySelectorAll('.addNotes');
const cancelButton = document.querySelector('#btnModalBox');
//! necessary elements 

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
