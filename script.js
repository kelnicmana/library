let myLibrary = [];
let thisTitle;
let thisAuthor;
let thisPages;

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    myLibrary.push(this);
    console.log(myLibrary);
}

// Book.prototype.status = function() {
//     if (true) {
//         this.status = 
//     }
//     else {

//     }
// }

const harryPotter = new Book('Harry Potter', 'JK Rowling', 309);
const theBellJar = new Book('The Bell Jar', 'Sylvia Plath', 244);

function togglePopUp() {
    if (document.querySelector('#popUp').classList.contains("show")) {
        document.querySelector('#popUp').classList.remove("show");
        }
    else {
    document.querySelector('#popUp').classList.add("show");
    }
}

function addToLibrary() {
    /// add event listener to submit button

    thisTitle = document.querySelector('.title').value;
    thisAuthor = document.querySelector('.author').value;
    thisPages = document.querySelector('.pages').value;
    ///const thisRead = document.querySelector('.status').value;
    new Book(thisTitle, thisAuthor, thisPages);
    document.querySelector('.title').value = "";
    document.querySelector('.author').value = "";
    document.querySelector('.pages').value = "";
    document.querySelector('#popUp').classList.remove("show");
}

