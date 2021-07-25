const bookContainer = document.querySelector(".book-container");
const addBookButton = document.querySelector("#add-book-button");
const closeModalIcon = document.querySelector(".close-modal");
let inputFields = document.querySelectorAll("input");
let modalContainer = document.querySelector(".modal-container");
let bookName = document.querySelector(".book-name");
let bookAuthor = document.querySelector(".book-author");
let bookPages = document.querySelector(".book-pages");
let addBookCard = document.querySelector(".add-book-card");
let blurBackground = document.querySelector("#background-blur");

let cardBeingEdited;
let bookBeingEdited;

let myLibrary = [];

function Book(title, author, totalPages, read = false){
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.read = read;
}

addBookCard.addEventListener("click", () => {
    blurBackground.classList.toggle("background");
    modalContainer.style.display = "block";
});

closeModalIcon.addEventListener("click", () => {
    closeModal();
    clearFields();
})

addBookButton.addEventListener("click", () => {

    let title = document.querySelector("input[name='title']").value;
    let author = document.querySelector("input[name='author']").value;
    let pages = document.querySelector("input[name='pages']").value;
    let read = document.querySelector("input[name='read']").checked;

    if(addBookButton.textContent == "Save Changes"){
            //Apply new changes to the book
            bookBeingEdited.title = title;
            bookBeingEdited.author = author;
            bookBeingEdited.totalPages = pages;
            bookBeingEdited.read = read; 

            //Change the text in the card being edited
            cardBeingEdited.childNodes[0].textContent = bookBeingEdited.title;
            cardBeingEdited.childNodes[1].textContent = bookBeingEdited.author;
            cardBeingEdited.childNodes[2].textContent = bookBeingEdited.totalPages;

            if(bookBeingEdited.read === true){
                cardBeingEdited.childNodes[3].textContent = "Read";
            }else{
                cardBeingEdited.childNodes[3].textContent = "Not Read";
            }

            closeModal();
            addBookButton.textContent = "Add";
    }else if(title !== "" && author !== "" && pages !== ""){    
            closeModal();
            clearFields();
            let newBook = new Book(title, author, pages, read);
            myLibrary.push(newBook);
            localStorage.cachedLibrary = JSON.stringify(myLibrary);
            addNewBook(newBook);
    }
});


let showBooks = () => {
    myLibrary.forEach( (book) => {
        addNewBook(book);
    });
}

let closeModal = () =>{
    blurBackground.classList.toggle("background");
    modalContainer.style.display = "none";
}

let openModal = () => {
    blurBackground.classList.toggle("background");
    modalContainer.style.display = "block";
}

let addNewBook = (book) => {
        let card = document.createElement("div");
        let title = document.createElement("p");
        let author = document.createElement("p");
        let pages = document.createElement("p");
        let read = document.createElement("p");
        let editButton = document.createElement("button");
        let deleteButton = document.createElement("button");

        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.totalPages;

        if(book.read === true){
            read.textContent = "Read";
        }else{
            read.textContent = "Not Read";
        }

        editButton.textContent = "Edit";
        deleteButton.textContent = "Delete";

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(editButton);
        card.appendChild(deleteButton);

        card.classList.add("card");
        editButton.classList.add("edit-button");
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", () => {
            bookContainer.removeChild(card);
            clearFields();
        });

        editButton.addEventListener("click", () => {
            openModal();

            let title = document.querySelector("input[name='title']");
            let author = document.querySelector("input[name='author']");
            let pages = document.querySelector("input[name='pages']");
            let read = document.querySelector("input[name='read']");
            let button = document.querySelector("#add-book-button");

            button.textContent = "Save Changes";

            title.value = book.title;
            author.value = book.author;
            pages.value = book.totalPages;
            read.checked = book.read;

            cardBeingEdited = card;
            bookBeingEdited = book;
            
        }); 

        bookContainer.prepend(card);
}


let clearFields = () => {

    inputFields.forEach( field => {
        if(field.getAttribute("name") == "read"){
            field.checked = false;
        }
        field.value = "";
    });

}

if(localStorage.getItem('cachedLibrary') !== null){
    myLibrary = JSON.parse(localStorage.getItem('cachedLibrary'));
}

showBooks();

