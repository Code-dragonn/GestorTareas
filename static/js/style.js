const modal = document.getElementById('modalBox');
const notesElements = document.querySelectorAll('.notes');
const notesAdd = document.querySelectorAll('.addNotes');
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
const cancelButton = document.querySelector('#btnModalBox');
cancelButton.addEventListener('click', () => {
    modal.style.display = 'none';
});
