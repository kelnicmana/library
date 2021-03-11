let myLibrary = [];
let thisTitle;
let thisAuthor;
let thisPages;
let index;

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = status;
    myLibrary.push(this);

    this.element = document
    console.log(myLibrary);
}


Book.prototype.status = function() {
    if (document.querySelector('.status').value === "1") {
        return `<button class="btn btn-success col-12" id="status "data-key="${index}" type="button">Read</button>`
    }
    else if (document.querySelector('.status').value === "0")  {
        return `<button class="btn btn-outline-secondary col-12" id="status" data-key="${index}" type="button">Unread</button>`
    }
}

Book.prototype.event = function(e) {
    switch (e.type) {
        case "click": this.click(e)
    }
}

Book.prototype.click = function(e) {
    if (this.element.classList.contains("btn-success")) {
        this.element.classList.add("btn-outline-secondary");
    }
}

// function toggleStatus() {
//     if (e.target.classList.contains("btn-success")) {
//         e.target.classList.remove("btn-success").add("btn-outline-secondary");
//     }
//     if (e.target.classList.contains("btn-outline-secondary")) {
//         e.target.classlist.remove("btn-outline-secondary").add("btn-success");
//     }
// }

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
    thisRead = document.querySelector('.status').value;
    new Book(thisTitle, thisAuthor, thisPages, thisRead);
    
    index = myLibrary.length - 1;

    const table = document.querySelector('.tbody');
    const tr = document.createElement('tr');
    tr.setAttribute('data', `data-key :"${index}"`);
    tr.innerHTML = `<td>${myLibrary[index].title}</td><td>${myLibrary[index].author}</td><td>${myLibrary[index].pages}</td><td>${myLibrary[index].status()}</td>`;
    table.appendChild(tr);

    document.querySelector('.title').value = "";
    document.querySelector('.author').value = "";
    document.querySelector('.pages').value = "";
    document.querySelector('#popUp').classList.remove("show");
}